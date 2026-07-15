import { useState, useEffect } from 'react';

import activityService from '../api/activities.service';
import useActivities from '../hooks/useActivities';
import PageHeader from "@/components/ui/PageHeader";
import { useSearch } from '@/context/SearchContext';

import CreateActivityModal from '../../../features/activities/components/CreateActivityModal';
import EditActivityModal from '../../../features/activities/components/EditActivityModal';
import DisableActivityModal from '../../../features/activities/components/DisableActivityModal';
import EnableActivityModal from '../../../features/activities/components/EnableActivityModal';

import {
  Button,
  StatsCard,
  Pagination,
  EmptyState,
} from '../../../components/ui';

const formatHorario = (isoValue) => {
  if (!isoValue) return '—';
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Activities = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showEnable, setShowEnable] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const { searchTerm } = useSearch();

  const {
    activities,
    loading,
    pagination,
    loadActivities,
  } = useActivities();

  // Cada vez que cambia el término de búsqueda del header, se vuelve a
  // cargar la página 1 con ese filtro. El debounce evita disparar una
  // petición por cada tecla presionada.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadActivities(1, pagination.limit, searchTerm);
    }, 400);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // El backend de actividades no expone un endpoint de estadísticas (a
  // diferencia de clases), así que solo mostramos lo que sí podemos derivar
  // de la lista paginada: el total de actividades activas y, entre las
  // cargadas en la página actual, la próxima que esté agendada.
  const proximaActividad = activities
    .filter((a) => a.activo && new Date(a.horario) >= new Date())
    .sort((a, b) => new Date(a.horario) - new Date(b.horario))[0];

  const statsCards = [
    {
      value: loading ? '—' : pagination?.totalItems ?? activities.length,
      label: 'Actividades activas',
    },
    {
      value: loading ? '—' : proximaActividad ? formatHorario(proximaActividad.horario) : '—',
      label: 'Próxima actividad',
    },
  ];

  const handleCreate = () => {
    setSelectedActivity(null);
    setShowCreate(true);
  };

  const handleSaveActivity = async (payload) => {
    try {
      await activityService.create(payload);
      await loadActivities(pagination.currentPage, pagination.limit, searchTerm);
      setShowCreate(false);
    } catch (error) {
      console.error('Error al crear la actividad:', error);
    }
  };

  const handleUpdateActivity = async (payload) => {
    try {
      const { id_actividad, ...activityData } = payload;
      await activityService.update(id_actividad, activityData);
      await loadActivities(pagination.currentPage, pagination.limit, searchTerm);
      setShowEdit(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error('Error al actualizar la actividad:', error);
      alert('Error al actualizar la actividad. Por favor, intenta de nuevo.');
    }
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setShowEdit(true);
  };

  const handleToggleActive = (activity) => {
    setSelectedActivity(activity);
    if (activity.activo) {
      setShowDisable(true);
    } else {
      setShowEnable(true);
    }
  };

  const confirmToggleActive = async () => {
    try {
      if (selectedActivity.activo) {
        await activityService.remove(selectedActivity.id_actividad);
      } else {
        await activityService.reactivate(selectedActivity.id_actividad);
      }
      await loadActivities(pagination.currentPage, pagination.limit, searchTerm);
      setShowDisable(false);
      setShowEnable(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error('Error al cambiar el estado de la actividad:', error);
      alert('Error al cambiar el estado de la actividad. Por favor, intenta de nuevo.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    loadActivities(newPage, pagination.limit, searchTerm);
  };

  const statsIcons = [
    <svg key="0" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />
    </svg>,
    <svg key="1" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">

        <PageHeader
          title="Actividades"
          description="Programa y administra las actividades del gimnasio."
          action={
            <Button
              onClick={handleCreate}
              icon={
                <svg className="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            >
              Nueva actividad
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
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

          {!loading && activities.length === 0 ? (
            <EmptyState
              variant="primary"
              title="Aún no hay actividades"
              description="Cuando crees una actividad, aparecerá aquí para que puedas gestionarla."
              icon={
                <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />
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
                  Crear primera actividad
                </Button>
              }
            />
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Nombre</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Sede</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Fecha y hora</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Descripción</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id_actividad} className="hover:bg-[var(--surface-2)] transition">
                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                            {activity.nombre.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="font-bold text-[var(--text)]">{activity.nombre}</div>
                        </div>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--muted)]">
                        {activity.sede}
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-[var(--info-bg)] text-[var(--primary-light)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-light)]" />
                          {formatHorario(activity.horario)}
                        </span>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--muted)]">
                        {activity.descripcion || '—'}
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)]">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(activity)}
                            className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
                          >
                            <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5Z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleToggleActive(activity)}
                            role="switch"
                            aria-checked={activity.activo}
                            title={activity.activo ? 'Deshabilitar actividad' : 'Habilitar actividad'}
                            className={`relative inline-flex h-[22px] w-[40px] items-center rounded-full border transition-colors duration-200 flex-shrink-0 ${
                              activity.activo
                                ? 'bg-[var(--accent)] border-[var(--accent)]'
                                : 'bg-[var(--surface-2)] border-[var(--border)]'
                            }`}
                          >
                            <span
                              className={`inline-block h-[16px] w-[16px] transform rounded-full bg-[var(--card)] shadow transition-transform duration-200 ${
                                activity.activo ? 'translate-x-[19px]' : 'translate-x-[2px]'
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
                  itemsCount={activities.length}
                  totalItems={pagination.totalItems}
                  label="actividades"
                />
              </div>
            </>
          )}
        </div>
      </main>

      <CreateActivityModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedActivity(null);
        }}
        onSave={handleSaveActivity}
      />

      <EditActivityModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedActivity(null);
        }}
        activityData={selectedActivity}
        onSave={handleUpdateActivity}
      />

      <DisableActivityModal
        open={showDisable}
        onClose={() => {
          setShowDisable(false);
          setSelectedActivity(null);
        }}
        activityData={selectedActivity}
        onConfirm={confirmToggleActive}
      />

      <EnableActivityModal
        open={showEnable}
        onClose={() => {
          setShowEnable(false);
          setSelectedActivity(null);
        }}
        activityData={selectedActivity}
        onConfirm={confirmToggleActive}
      />
    </div>
  );
};

export default Activities;