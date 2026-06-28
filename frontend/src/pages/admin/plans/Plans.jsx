import { useState } from 'react';
import AdminHeader from '../../../components/layout/AdminHeader';
import AdminFooter from '../../../components/layout/AdminFooter';

import CreatePlanModal from './CreatePlansModal';
import EditPlanModal from './EditPlansModal';
import DeletePlanDialog from './DeletePlansModal';

import {
  Button,
  StatsCard,
} from '../../../components/ui';

const Plans = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Plan Mensual',
      time: '1 mes',
      cost: 45000,
      subscribers: 128,
      badge: 'blue',
    },
    {
      id: 2,
      name: 'Plan 15 Días',
      time: '15 días',
      cost: 28000,
      subscribers: 54,
      badge: 'blue',
    },
    {
      id: 3,
      name: 'Plan Estudiante',
      time: '1 mes',
      cost: 36000,
      subscribers: 76,
      badge: 'blue',
    },
    {
      id: 4,
      name: 'Plan Amigos / Pareja',
      time: '1 mes',
      cost: 80000,
      subscribers: 40,
      badge: 'blue',
    },
    {
      id: 5,
      name: 'Plan Trimestre',
      time: '3 meses',
      cost: 120000,
      subscribers: 22,
      badge: 'blue',
    },
    {
      id: 6,
      name: 'Plan Semestral',
      time: '6 meses',
      cost: 220000,
      subscribers: 14,
      badge: 'blue',
    },
    {
      id: 7,
      name: 'Plan Año',
      time: '12 meses',
      cost: 390000,
      subscribers: 8,
      badge: 'blue',
    },
    {
      id: 8,
      name: 'Valor Día',
      time: '1 día',
      cost: 5000,
      subscribers: 0,
      badge: 'blue',
    },
  ]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const stats = [
    { value: plans.length, label: 'Planes activos' },
    { value: '$45.000', label: 'Plan más popular' },
    { value: '12 meses', label: 'Plan más largo' },
  ];

  const handleCreate = () => {
    setSelectedPlan(null);
    setShowCreate(true);
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setShowEdit(true);
  };

  const handleDelete = (plan) => {
    setSelectedPlan(plan);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setPlans(plans.filter((p) => p.id !== selectedPlan.id));
    setShowConfirm(false);
    setSelectedPlan(null);
  };

  // Íconos para las 3 stats
  const statsIcons = [
    // Planes activos
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
    </svg>,
    // Plan más popular
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>,
    // Plan más largo
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminHeader />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex items-end justify-between gap-5 flex-wrap mb-6">
          <div>
            <h1 className="text-[26px] font-head font-extrabold text-[var(--text)]">
              Planes
            </h1>
            <p className="text-[var(--muted)] text-sm mt-1">
              Administra los planes de membresía y sus precios.
            </p>
          </div>

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
        </div>

        {/* Stats - 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
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

        {/* Table */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Nombre
                </th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Tiempo
                </th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Costo
                </th>
                <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-[var(--surface-2)] transition">
                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                        {plan.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[var(--text)]">{plan.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Tiempo con bolita azul */}
                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-[var(--info-bg)] text-[var(--primary-light)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-light)]" />
                      {plan.time}
                    </span>
                  </td>

                  {/* Costo con COP */}
                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <span className="font-extrabold text-[var(--text)]">
                      {formatCurrency(plan.cost)} <span className="font-normal text-[var(--muted)] text-xs">COP</span>
                    </span>
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)]">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
                      >
                        <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(plan)}
                        className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition"
                      >
                        <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
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
            <span>Mostrando {plans.length} de {plans.length} planes</span>
          </div>
        </div>
      </main>

      <AdminFooter />

      <CreatePlanModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
      />

      <EditPlanModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
      />

      <DeletePlanDialog
        open={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Plans;