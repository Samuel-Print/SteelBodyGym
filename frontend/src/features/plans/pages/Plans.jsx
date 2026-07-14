import { useState, useEffect } from 'react';

import planService from '../api/plans.service';
import usePlans from '../hooks/usePlans';
import PageHeader from "@/components/ui/PageHeader";

import PlanCreateModal from '../components/CreatePlansModal';
import PlanEditModal from '../components/EditPlansModal';
import DisablePlanModal from '../components/DisablePlanModal';
import EnablePlanModal from '../components/EnablePlanModal';

import {
  Button,
  StatsCard,
  Pagination,
} from '../../../components/ui';

const Plans = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showEnable, setShowEnable] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const [stats, setStats] = useState({
    planesActivos: 0,
    planMasPopular: null,
    planMasLargo: null,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const {
    plans,
    loading,
    pagination,
    loadPlans,
  } = usePlans();

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const data = await planService.getStats();
      setStats({
        planesActivos: data?.planesActivos ?? 0,
        planMasPopular: data?.planMasPopular ?? null,
        planMasLargo: data?.planMasLargo ?? null,
      });
    } catch (error) {
      console.error('Error al cargar las estadísticas de planes:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const formatTiempo = (meses) => {
    const value = Number(meses);
    if (value >= 1) return `${value} ${value === 1 ? 'mes' : 'meses'}`;
    const dias = Math.round(value * 30);
    return `${dias} día${dias === 1 ? '' : 's'}`;
  };

  const statsCards = [
    {
      value: statsLoading ? '—' : stats.planesActivos,
      label: 'Planes activos',
    },
    {
      value: statsLoading
        ? '—'
        : stats.planMasPopular?.nombre ?? 'Sin datos',
      label: 'Plan más popular',
    },
    {
      value: statsLoading
        ? '—'
        : stats.planMasLargo
          ? `${stats.planMasLargo.nombre} · ${formatTiempo(stats.planMasLargo.tiempo_meses)}`
          : 'Sin datos',
      label: 'Plan más largo',
    },
  ];

  const handleCreate = () => {
    setSelectedPlan(null);
    setShowCreate(true);
  };

  const handleSavePlan = async (plan) => {
    try {
      await planService.create(plan);
      await loadPlans();
      await loadStats();
      setShowCreate(false);
    } catch (error) {
      console.error('Error al crear el plan:', error);
    }
  };

  const handleUpdatePlan = async (plan) => {
    try {
      await planService.update(plan.id_plan, plan);
      await loadPlans();
      await loadStats();
      setShowEdit(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error('Error al actualizar el plan:', error);
      alert('Error al actualizar el plan. Por favor, intenta de nuevo.');
    }
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setShowEdit(true);
  };

  const handleToggleActive = (plan) => {
    setSelectedPlan(plan);
    if (plan.activo) {
      setShowDisable(true);
    } else {
      setShowEnable(true);
    }
  };

  const confirmToggleActive = async () => {
    try {
      if (selectedPlan.activo) {
        await planService.remove(selectedPlan.id_plan); // -> softDelete (activo: false)
      } else {
        await planService.reactivate(selectedPlan.id_plan);
      }
      await loadPlans();
      await loadStats();
      setShowDisable(false);
      setShowEnable(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error('Error al cambiar el estado del plan:', error);
      alert('Error al cambiar el estado del plan. Por favor, intenta de nuevo.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    loadPlans(newPage);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);

  const statsIcons = [
    <svg key="0" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
    </svg>,
    <svg key="1" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>,
    <svg key="2" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">

        <PageHeader
          title="Planes"
          description="Gestiona los planes de membresía."
          action={
            <Button
              onClick={handleCreate}
              icon={
                <svg className="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            >
              Nuevo plan
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
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Nombre</th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Descripción</th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Tiempo</th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Costo</th>
                <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id_plan} className="hover:bg-[var(--surface-2)] transition">
                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                        {plan.nombre.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="font-bold text-[var(--text)]">{plan.nombre}</div>
                    </div>
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--muted)]">
                    {plan.descripcion || '—'}
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-[var(--info-bg)] text-[var(--primary-light)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-light)]" />
                      {formatTiempo(plan.tiempo_meses)}
                    </span>
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <span className="font-extrabold text-[var(--text)]">
                      {formatCurrency(plan.costo)}{' '}
                      <span className="font-normal text-[var(--muted)] text-xs">COP</span>
                    </span>
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)]">
                    <div className="flex justify-end gap-2">
                      {/* Editar */}
                      <button
                        onClick={() => handleEdit(plan)}
                        className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
                      >
                        <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5Z" />
                        </svg>
                      </button>

                      {/* Habilitar / Deshabilitar */}
                      <button
                        onClick={() => handleToggleActive(plan)}
                        role="switch"
                        aria-checked={plan.activo}
                        title={plan.activo ? 'Deshabilitar plan' : 'Habilitar plan'}
                        className={`relative inline-flex h-[22px] w-[40px] items-center rounded-full border transition-colors duration-200 flex-shrink-0 ${
                          plan.activo
                            ? 'bg-[var(--accent)] border-[var(--accent)]'
                            : 'bg-[var(--surface-2)] border-[var(--border)]'
                        }`}
                      >
                        <span
                          className={`inline-block h-[16px] w-[16px] transform rounded-full bg-[var(--card)] shadow transition-transform duration-200 ${
                            plan.activo ? 'translate-x-[19px]' : 'translate-x-[2px]'
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
              itemsCount={plans.length}
              totalItems={pagination.totalItems}
              label="planes"
            />
          </div>
        </div>
      </main>

      <PlanCreateModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedPlan(null);
        }}
        onSave={handleSavePlan}
      />

      <DisablePlanModal
        open={showDisable}
        onClose={() => {
          setShowDisable(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onConfirm={confirmToggleActive}
      />

      <EnablePlanModal
        open={showEnable}
        onClose={() => {
          setShowEnable(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onConfirm={confirmToggleActive}
      />

      <PlanEditModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onSave={handleUpdatePlan}
      />
    </div>
  );
};

export default Plans;