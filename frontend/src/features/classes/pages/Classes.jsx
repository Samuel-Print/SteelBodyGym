import { useState, useEffect } from 'react';

import classService from '../api/classes.service';
import horariosService from '../api/horarios.service';
import useClasses from '../hooks/useClasses';
import PageHeader from "@/components/ui/PageHeader";
import { useSearch } from '@/context/SearchContext';

import CreateClassModal from '../../../features/classes/components/CreateClassModal';
import EditClassModal from '../../../features/classes/components/EditClassModal';
import DisableClassModal from '../../../features/classes/components/DisableClassModal';
import EnableClassModal from '../../../features/classes/components/EnableClassModal';

import {
  Button,
  StatsCard,
  Pagination,
  EmptyState,
} from '../../../components/ui';

const Classes = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showEnable, setShowEnable] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);

  const { searchTerm } = useSearch();

  const [stats, setStats] = useState({
    clasesSemanales: 0,
    duracionMediaMinutos: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const {
    classes,
    loading,
    pagination,
    loadClasses,
  } = useClasses();

  // Cada vez que cambia el término de búsqueda del header, se vuelve a
  // cargar la página 1 con ese filtro. El debounce evita disparar una
  // petición por cada tecla presionada.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadClasses(1, pagination.limit, searchTerm);
    }, 400);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const data = await classService.getStats();
      setStats({
        clasesSemanales: data?.clasesSemanales ?? 0,
        duracionMediaMinutos: data?.duracionMediaMinutos ?? 0,
      });
    } catch (error) {
      console.error('Error al cargar las estadísticas de clases:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // "Clases activas" no viene en el endpoint de stats (solo devuelve
  // clasesSemanales y duracionMediaMinutos), así que usamos el total
  // de la lista paginada, que ya filtra por activo: true.
  const statsCards = [
    {
      value: loading ? '—' : pagination?.totalItems ?? classes.length,
      label: 'Clases activas',
    },
    {
      value: statsLoading ? '—' : stats.clasesSemanales,
      label: 'Horarios semanales',
    },
    {
      value: statsLoading
        ? '—'
        : `${Math.round(stats.duracionMediaMinutos)} min`,
      label: 'Duración media',
    },
  ];

  const handleCreate = () => {
    setSelectedClass(null);
    setShowCreate(true);
  };

  const handleSaveClass = async (payload) => {
    try {
      const { horarios, ...claseData } = payload;
      const createdClase = await classService.create(claseData);

      await Promise.all(
        horarios.map((h) =>
          horariosService.create({
            id_clase: createdClase.id_clase,
            dia_semana: h.dia_semana,
            hora_inicio: h.hora_inicio,
            hora_fin: h.hora_fin,
          })
        )
      );

      await loadClasses(pagination.currentPage, pagination.limit, searchTerm);
      await loadStats();
      setShowCreate(false);
    } catch (error) {
      console.error('Error al crear la clase:', error);
    }
  };

  const handleUpdateClass = async (payload) => {
    try {
      const { id_clase, horarios, removedHorarioIds, ...claseData } = payload;

      await classService.update(id_clase, claseData);

      await Promise.all([
        ...horarios
          .filter((h) => h.id_horario)
          .map((h) =>
            horariosService.update(h.id_horario, {
              dia_semana: h.dia_semana,
              hora_inicio: h.hora_inicio,
              hora_fin: h.hora_fin,
            })
          ),
        ...horarios
          .filter((h) => !h.id_horario)
          .map((h) =>
            horariosService.create({
              id_clase,
              dia_semana: h.dia_semana,
              hora_inicio: h.hora_inicio,
              hora_fin: h.hora_fin,
            })
          ),
        ...removedHorarioIds.map((id) => horariosService.remove(id)),
      ]);

      await loadClasses(pagination.currentPage, pagination.limit, searchTerm);
      await loadStats();
      setShowEdit(false);
      setSelectedClass(null);
    } catch (error) {
      console.error('Error al actualizar la clase:', error);
      alert('Error al actualizar la clase. Por favor, intenta de nuevo.');
    }
  };

  const handleEdit = (cls) => {
    setSelectedClass(cls);
    setShowEdit(true);
  };

  const handleToggleActive = (cls) => {
    setSelectedClass(cls);
    if (cls.activo) {
      setShowDisable(true);
    } else {
      setShowEnable(true);
    }
  };

  const confirmToggleActive = async () => {
    try {
      if (selectedClass.activo) {
        await classService.remove(selectedClass.id_clase);
      } else {
        await classService.reactivate(selectedClass.id_clase);
      }
      await loadClasses(pagination.currentPage, pagination.limit, searchTerm);
      await loadStats();
      setShowDisable(false);
      setShowEnable(false);
      setSelectedClass(null);
    } catch (error) {
      console.error('Error al cambiar el estado de la clase:', error);
      alert('Error al cambiar el estado de la clase. Por favor, intenta de nuevo.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    loadClasses(newPage, pagination.limit, searchTerm);
  };

  const statsIcons = [
    <svg key="0" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>,
    <svg key="1" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>,
    <svg key="2" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">

        <PageHeader
          title="Clases"
          description="Programa y administra las clases dirigidas del gimnasio."
          action={
            <Button
              onClick={handleCreate}
              icon={
                <svg className="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            >
              Nueva clase
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
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

          {!loading && classes.length === 0 ? (
            <EmptyState
              variant="primary"
              title="Aún no hay clases"
              description="Cuando crees una clase dirigida, aparecerá aquí para que puedas gestionarla."
              icon={
                <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
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
                  Crear primera clase
                </Button>
              }
            />
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Nombre</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Descripción</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Horarios</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => (
                    <tr key={cls.id_clase} className="hover:bg-[var(--surface-2)] transition">
                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                            {cls.nombre.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="font-bold text-[var(--text)]">{cls.nombre}</div>
                        </div>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--muted)]">
                        {cls.descripcion || '—'}
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                        <div className="flex flex-wrap gap-1.5">
                          {cls.horarios?.length ? (
                            cls.horarios.map((h) => (
                              <span
                                key={h.id_horario}
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-[var(--info-bg)] text-[var(--primary-light)]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-light)]" />
                                {h.dia_semana} {h.hora_inicio?.slice(0, 5)}–{h.hora_fin?.slice(0, 5)}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-[var(--muted)]">Sin horario</span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)]">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(cls)}
                            className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
                          >
                            <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5Z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleToggleActive(cls)}
                            role="switch"
                            aria-checked={cls.activo}
                            title={cls.activo ? 'Deshabilitar clase' : 'Habilitar clase'}
                            className={`relative inline-flex h-[22px] w-[40px] items-center rounded-full border transition-colors duration-200 flex-shrink-0 ${
                              cls.activo
                                ? 'bg-[var(--accent)] border-[var(--accent)]'
                                : 'bg-[var(--surface-2)] border-[var(--border)]'
                            }`}
                          >
                            <span
                              className={`inline-block h-[16px] w-[16px] transform rounded-full bg-[var(--card)] shadow transition-transform duration-200 ${
                                cls.activo ? 'translate-x-[19px]' : 'translate-x-[2px]'
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
                  itemsCount={classes.length}
                  totalItems={pagination.totalItems}
                  label="clases"
                />
              </div>
            </>
          )}
        </div>
      </main>

      <CreateClassModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedClass(null);
        }}
        onSave={handleSaveClass}
      />

      <EditClassModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
        onSave={handleUpdateClass}
      />

      <DisableClassModal
        open={showDisable}
        onClose={() => {
          setShowDisable(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
        onConfirm={confirmToggleActive}
      />

      <EnableClassModal
        open={showEnable}
        onClose={() => {
          setShowEnable(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
        onConfirm={confirmToggleActive}
      />
    </div>
  );
};

export default Classes;