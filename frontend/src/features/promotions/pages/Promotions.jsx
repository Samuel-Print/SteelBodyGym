import { useState, useEffect } from 'react';

import promotionService from '../api/promotion.service';
import usePromotions from '../hooks/usePromotions';
import PageHeader from "@/components/ui/PageHeader";
import { useSearch } from '@/context/SearchContext';

import PromotionCreateModal from '../../../features/promotions/components/CreatePromotionModal';
import PromotionEditModal from '../../../features/promotions/components/EditPromotionModal';
import DisablePromotionModal from '../../../features/promotions/components/DisablePromotionModal';
import EnablePromotionModal from '../../../features/promotions/components/EnablePromotionModal';

import {
  Button,
  StatsCard,
  Pagination,
  EmptyState,
} from '../../../components/ui';

const Promotions = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDisable, setShowDisable] = useState(false);
    const [showEnable, setShowEnable] = useState(false);

    const [selectedPromo, setSelectedPromo] = useState(null);

    const { searchTerm } = useSearch();

    const [stats, setStats] = useState({
        total: 0,
        vigentes: 0,
        prontasAVencer: 0,
    });
    const [statsLoading, setStatsLoading] = useState(true);

    const {
        promotions,
        loading,
        pagination,
        loadPromotions,
    } = usePromotions();

    // Cada vez que cambia el término de búsqueda del header, se vuelve a
    // cargar la página 1 con ese filtro. El debounce evita disparar una
    // petición por cada tecla presionada.
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        loadPromotions(1, pagination.limit, searchTerm);
      }, 400);

      return () => clearTimeout(timeoutId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const loadStats = async () => {
        try {
            setStatsLoading(true);
            const data = await promotionService.getStats();
            setStats({
                total: data?.total ?? 0,
                vigentes: data?.vigentes ?? 0,
                prontasAVencer: data?.prontasAVencer ?? 0,
            });
        } catch (error) {
            console.error('Error al cargar las estadísticas de promociones:', error);
        } finally {
            setStatsLoading(false);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    const getBadgeClass = (badge) => {
        switch (badge) {
            case 'green':
            return 'bg-green-100 text-green-700';

            case 'amber':
            return 'bg-amber-100 text-amber-700';

            case 'red':
            return 'bg-red-100 text-red-700';

            default:
            return 'bg-gray-100 text-gray-700';
        }
    };

  const statsCards = [
    { value: statsLoading ? '—' : stats.total, label: 'Promociones totales' },
    { value: statsLoading ? '—' : stats.vigentes, label: 'Vigentes' },
    { value: statsLoading ? '—' : stats.prontasAVencer, label: 'Por vencer' },
  ];

  const handleCreate = () => {
    setSelectedPromo(null);
    setShowCreate(true);
  };

  const handleSavePromotion = async (promotion) => {
        try {
            await promotionService.create(promotion);
            await loadPromotions();
            await loadStats();
            setShowCreate(false);
        } catch (error) {
            console.error('Error al crear la promoción:', error);
        }
    };

  // Función para actualizar promoción
  const handleUpdatePromotion = async (promotion) => {
        try {
            // Usamos el método update del service con el ID y los datos
            await promotionService.update(promotion.id_promocion, promotion);
            
            // Recargar la lista de promociones y las estadísticas
            await loadPromotions();
            await loadStats();
            
            // Cerrar el modal y limpiar selección
            setShowEdit(false);
            setSelectedPromo(null);
        } catch (error) {
            console.error('Error al actualizar la promoción:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
            alert('Error al actualizar la promoción. Por favor, intenta de nuevo.');
        }
    };

  const handleEdit = (promo) => {
    setSelectedPromo(promo);
    setShowEdit(true);
  };

  const handleToggleActive = (promo) => {
    setSelectedPromo(promo);
    if (promo.activo) {
      setShowDisable(true);
    } else {
      setShowEnable(true);
    }
  };

  const confirmToggleActive = async () => {
    try {
      await promotionService.update(selectedPromo.id_promocion, { activo: !selectedPromo.activo });
      await loadPromotions();
      await loadStats();
      setShowDisable(false);
      setShowEnable(false);
      setSelectedPromo(null);
    } catch (error) {
      console.error('Error al cambiar el estado de la promoción:', error);
      alert('Error al cambiar el estado de la promoción. Por favor, intenta de nuevo.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    loadPromotions(newPage);
  };

  const statsIcons = [
    <svg
      key="stat-icon-target"
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <path d="m15 5 4 4M13.5 3.5 21 11l-9 9-7.5-.5L4 12z" />
    </svg>,

    <svg
      key="stat-icon-check"
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
    </svg>,

    <svg
      key="stat-icon-alert"
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>,

    <svg
      key="stat-icon-trend"
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">

      <PageHeader
          title="Promociones"
          description="Gestiona las promociones del gimnasio."
          action={
            <Button
                onClick={() => {
                  setSelectedPromo(null);
                  setShowCreate(true);
                }}
                icon={
                  <svg
                    className="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                }
              >
              Nueva promoción
            </Button>
          }
      />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-7">
          {statsCards.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={statsIcons[index]}
              variant="default"
            />
          ))}
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm overflow-hidden">

          {!loading && promotions.length === 0 ? (
          <EmptyState
            variant="primary"
            title="Aún no hay promociones"
            description="Cuando crees una promoción, aparecerá aquí para que puedas gestionarla."
            icon={
              <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <path d="m15 5 4 4M13.5 3.5 21 11l-9 9-7.5-.5L4 12z" />
                <circle cx="9.5" cy="8.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            }
            action={
              <Button
                onClick={handleCreate}
                icon={
                  <svg className="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                }
              >
                Crear primera promoción
              </Button>
            }
          />
          ) : (
            <>
              <table className="w-full border-collapse">

                <thead>

                  <tr>

                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                      Nombre del plan
                    </th>

                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                      Descripción
                    </th>

                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                      Fecha de caducación
                    </th>

                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                      Acciones
                    </th>

                  </tr>

                </thead>

                <tbody>
                  {promotions.map((promo) => (
                    <tr
                      key={promo.id_promocion}
                      className="hover:bg-[var(--surface-2)] transition"
                    >
                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                            {promo.nombre.substring(0, 2).toUpperCase()}
                          </div>

                          <div>
                            <div className="font-bold text-[var(--text)]">
                              {promo.nombre}
                            </div>

                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--muted)]">
                        {promo.descripcion}
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">

                        <div className="text-[15px] text-[var(--muted)] mt-1">
                          {new Date(promo.fecha_caducacion).toLocaleDateString('es-CO', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            timeZone: 'UTC',
                          })}
                        </div>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)]">
                        <div className="flex justify-end gap-2">

                          {/* Editar */}
                          <button
                            onClick={() => handleEdit(promo)}
                            className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
                          >
                            <svg
                              className="w-4 h-4 stroke-current fill-none stroke-2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5Z" />
                            </svg>
                          </button>

                          {/* Habilitar / Deshabilitar */}
                          <button
                            onClick={() => handleToggleActive(promo)}
                            role="switch"
                            aria-checked={promo.activo}
                            title={promo.activo ? 'Deshabilitar promoción' : 'Habilitar promoción'}
                            className={`relative inline-flex h-[22px] w-[40px] items-center rounded-full border transition-colors duration-200 flex-shrink-0 ${
                              promo.activo
                                ? 'bg-[var(--accent)] border-[var(--accent)]'
                                : 'bg-[var(--surface-2)] border-[var(--border)]'
                            }`}
                          >
                            <span
                              className={`inline-block h-[16px] w-[16px] transform rounded-full bg-[var(--card)] shadow transition-transform duration-200 ${
                                promo.activo ? 'translate-x-[19px]' : 'translate-x-[2px]'
                              }`}
                            />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div className="px-5 py-3.5 border-t border-[var(--border)]">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  itemsCount={promotions.length}
                  totalItems={pagination.totalItems}
                  label="promociones"
                />
              </div>
            </>
          )}
        </div>
      </main>

      <PromotionCreateModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedPromo(null);
        }}
        onSave={handleSavePromotion}
      />

      <DisablePromotionModal
        open={showDisable}
        onClose={() => {
          setShowDisable(false);
          setSelectedPromo(null);
        }}
        promotion={selectedPromo}
        onConfirm={confirmToggleActive}
      />

      <EnablePromotionModal
        open={showEnable}
        onClose={() => {
          setShowEnable(false);
          setSelectedPromo(null);
        }}
        promotion={selectedPromo}
        onConfirm={confirmToggleActive}
      />

      <PromotionEditModal 
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedPromo(null);
        }}
        promotion={selectedPromo}
        onSave={handleUpdatePromotion}
      />
    </div>
  );
};

export default Promotions;