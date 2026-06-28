import { useState } from 'react';
import AdminHeader from '../../../components/layout/AdminHeader';
import AdminFooter from '../../../components/layout/AdminFooter';

import CreateBranchModal from './CreateBranchModal';
import EditBranchModal from './EditBranchModal';
import DeleteBranchDialog from './DeleteBranchDialog';

import {
  Button,
  StatsCard,
} from '../../../components/ui';

const Branches = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Sede Centro',
      city: 'Bogotá',
      location: 'Cra. 7 #45-12, Chapinero',
      schedule: 'Lun–Sáb · 5:00 AM – 10:00 PM',
      status: 'Abierta',
      badge: 'green',
    },
    {
      id: 2,
      name: 'Sede Norte',
      city: 'Bogotá',
      location: 'Calle 140 #15-30, Usaquén',
      schedule: 'Lun–Dom · 5:00 AM – 11:00 PM',
      status: 'Abierta',
      badge: 'green',
    },
    {
      id: 3,
      name: 'Sede Medellín',
      city: 'Medellín',
      location: 'Cra. 43A #5-15, El Poblado',
      schedule: 'Lun–Sáb · 6:00 AM – 9:00 PM',
      status: 'Mantenimiento',
      badge: 'amber',
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
        return 'bg-blue-100 text-blue-700';
    }
  };

  const stats = [
    { value: branches.length, label: 'Sedes activas' },
    { value: '2', label: 'Ciudades' },
    { value: '5 AM–10 PM', label: 'Horario base' },
    { value: '342', label: 'Miembros totales' },
  ];

  const handleCreate = () => {
    setSelectedBranch(null);
    setShowCreate(true);
  };

  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setShowEdit(true);
  };

  const handleDelete = (branch) => {
    setSelectedBranch(branch);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setBranches(branches.filter((b) => b.id !== selectedBranch.id));
    setShowConfirm(false);
    setSelectedBranch(null);
  };

  const statsIcons = [
    // Sedes activas
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>,
    // Ciudades
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
    </svg>,
    // Horario base
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>,
    // Miembros totales
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminHeader />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex items-end justify-between gap-5 flex-wrap mb-6">
          <div>
            <h1 className="text-[26px] font-head font-extrabold text-[var(--text)]">
              Sedes
            </h1>
            <p className="text-[var(--muted)] text-sm mt-1">
              Gestiona las sedes, ubicaciones y horarios de atención.
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
            Nueva sede
          </Button>
        </div>

        {/* Stats */}
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

        {/* Table */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Nombre
                </th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Ubicación geográfica
                </th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Horario de atención
                </th>
                <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id} className="hover:bg-[var(--surface-2)] transition">
                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                        {branch.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[var(--text)]">{branch.name}</div>
                        <div className="text-[12.5px] text-[var(--muted)]">{branch.city}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                    {branch.location}
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                    {branch.schedule}
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)]">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
                      >
                        <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(branch)}
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
            <span>Mostrando {branches.length} de {branches.length} sedes</span>
          </div>
        </div>
      </main>

      <AdminFooter />

      <CreateBranchModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
      />

      <EditBranchModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
      />

      <DeleteBranchDialog
        open={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Branches;