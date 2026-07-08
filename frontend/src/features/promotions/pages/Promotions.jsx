import { useState } from 'react';
import AdminHeader from '../../../components/layout/AdminHeader';
import AdminFooter from '../../../components/layout/AdminFooter';
import PageHeader from "@/components/ui/PageHeader";

import PromotionCreateModal from '../../../features/promotions/components/CreatePromotionModal';
import PromotionDeleteModal from '../../../features/promotions/components/DeletePromotionDialog';
import PromotionEditModal from '../../../features/promotions/components/EditPromotionModal';

import {
  Button,
  SearchBar,
  Select,
  StatsCard,
} from '../../../components/ui';

const Promotions = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

  const [selectedPromo, setSelectedPromo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Datos de ejemplo
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: '2x1 Plan Mensual',
      description: 'Trae a un amigo y ambos pagan un solo mes.',
      expiration: '2026-06-30',
      status: 'Vigente',
      badge: 'green',
    },
    {
      id: 2,
      name: 'Descuento Estudiante',
      description:
        '20% de descuento en cualquier plan presentando carnet.',
      expiration: '2026-12-15',
      status: 'Vigente',
      badge: 'green',
    },
    {
      id: 3,
      name: 'Plan Año -30%',
      description:
        'Ahorra 30% pagando el plan anual por adelantado.',
      expiration: '2026-07-10',
      status: 'Por vencer',
      badge: 'amber',
    },
    {
      id: 4,
      name: 'Verano Fit',
      description:
        'Inscripción sin matrícula durante el verano.',
      expiration: '2026-02-28',
      status: 'Caducada',
      badge: 'red',
    },
  ]);

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

  const stats = [
    { value: '12', label: 'Promociones totales' },
    { value: '8', label: 'Vigentes' },
    { value: '3', label: 'Por vencer' },
    { value: '+24%', label: 'Conversión' },
  ];

  const handleCreate = () => {
    setSelectedPromo(null);
    setShowCreate(true);
  };

  const handleEdit = (promo) => {
    setSelectedPromo(promo);
    setShowEdit(true);
  };

  const handleDelete = (promo) => {
    setSelectedPromo(promo);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setPromotions(
      promotions.filter((p) => p.id !== selectedPromo.id)
    );

    setShowConfirm(false);
    setSelectedPromo(null);
  };

  const statsIcons = [
    <svg
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <path d="m15 5 4 4M13.5 3.5 21 11l-9 9-7.5-.5L4 12z" />
    </svg>,

    <svg
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
    </svg>,

    <svg
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>,

    <svg
      className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
      viewBox="0 0 24 24"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminHeader />

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {stats.map((stat, index) => (
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
                  key={promo.id}
                  className="hover:bg-[var(--surface-2)] transition"
                >
                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                        {promo.name.substring(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <div className="font-bold text-[var(--text)]">
                          {promo.name}
                        </div>

                        <div className="text-[12.5px] text-[var(--muted)]">
                          Promoción de temporada
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--muted)]">
                    {promo.description}
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">

                    <div className="text-[15px] text-[var(--muted)] mt-1">
                      {new Date(promo.expiration).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
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

                      {/* Eliminar */}
                      <button
                        onClick={() => handleDelete(promo)}
                        className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition"
                      >
                        <svg
                          className="w-4 h-4 stroke-current fill-none stroke-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
                          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          <div className="flex items-center justify-between px-5 py-3.5 border-t border-[var(--border)] text-[13px] text-[var(--muted)]">
            <span>
              Mostrando {promotions.length} de {promotions.length} promociones
            </span>
          </div>
        </div>
      </main>

      <AdminFooter />

      <PromotionCreateModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedPromo(null);
        }}
        promotion={selectedPromo}
      />

      <PromotionDeleteModal
        open={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setSelectedPromo(null);
        }}
        promotion={selectedPromo}
        onConfirm={confirmDelete}
      />

      <PromotionEditModal 
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedPromo(null);
        }}
        promotion={selectedPromo}
      />
    </div>
  );
};

export default Promotions;