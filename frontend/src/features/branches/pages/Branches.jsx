import { useState, useEffect } from 'react';

import branchService from '../api/branches.service';
import useBranches from '../../../features/branches/hooks/useBranches';
import PageHeader from "@/components/ui/PageHeader";
import { useSearch } from '@/context/SearchContext';

import CreateBranchModal from '../../../features/branches/components/CreateBranchModal';
import EditBranchModal from '../../../features/branches/components/EditBranchModal';
import DisableBranchModal from '../../../features/branches/components/DisableBranchModal';
import EnableBranchModal from '../../../features/branches/components/EnableBranchModal';

import {
  Button,
  StatsCard,
  Pagination,
  EmptyState,
} from '../../../components/ui';

const Branches = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showEnable, setShowEnable] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState(null);

  const { searchTerm } = useSearch();

  const {
    branches,
    loading,
    pagination,
    loadBranches,
  } = useBranches();

  // Cada vez que cambia el término de búsqueda del header, se vuelve a
  // cargar la página 1 con ese filtro. El debounce evita disparar una
  // petición por cada tecla presionada.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadBranches(1, pagination.limit, searchTerm);
    }, 400);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const stats = [
    { value: '—', label: 'Sedes activas' },
    { value: '—', label: 'Ciudades' },
    { value: '—', label: 'Horario base' },
  ];

  const handleCreate = () => {
    setSelectedBranch(null);
    setShowCreate(true);
  };

  const handleSaveBranch = async (branch) => {
    try {
      await branchService.create(branch);
      await loadBranches(pagination.currentPage, pagination.limit, searchTerm);
      setShowCreate(false);
    } catch (error) {
      console.error('Error al crear la sede:', error);
    }
  };

  const handleUpdateBranch = async (branch) => {
    try {
      await branchService.update(branch.id_sede, branch);
      await loadBranches(pagination.currentPage, pagination.limit, searchTerm);
      setShowEdit(false);
      setSelectedBranch(null);
    } catch (error) {
      console.error('Error al actualizar la sede:', error);
      alert('Error al actualizar la sede. Por favor, intenta de nuevo.');
    }
  };

  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setShowEdit(true);
  };

  const handleToggleActive = (branch) => {
    setSelectedBranch(branch);
    if (branch.activo) {
      setShowDisable(true);
    } else {
      setShowEnable(true);
    }
  };

  const confirmToggleActive = async () => {
    try {
      if (selectedBranch.activo) {
        await branchService.remove(selectedBranch.id_sede);
      } else {
        await branchService.reactivate(selectedBranch.id_sede);
      }
      await loadBranches(pagination.currentPage, pagination.limit, searchTerm);
      setShowDisable(false);
      setShowEnable(false);
      setSelectedBranch(null);
    } catch (error) {
      console.error('Error al cambiar el estado de la sede:', error);
      alert('Error al cambiar el estado de la sede. Por favor, intenta de nuevo.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    loadBranches(newPage, pagination.limit, searchTerm);
  };

  const statsIcons = [
    <svg key="0" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>,
    <svg key="1" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
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
          title="Sedes"
          description="Gestiona las sedes, ubicaciones y horarios de atención."
          action={
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
          }
        />

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

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm overflow-hidden">

          {!loading && branches.length === 0 ? (
            <EmptyState
              variant="primary"
              title="Aún no hay sedes"
              description="Cuando crees una sede, aparecerá aquí para que puedas gestionarla."
              icon={
                <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
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
                  Crear primera sede
                </Button>
              }
            />
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Nombre</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Dirección</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Horario de atención</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id_sede} className="hover:bg-[var(--surface-2)] transition">
                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                            {branch.nombre.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-[var(--text)]">{branch.nombre}</div>
                            {branch.telefono && (
                              <div className="text-[12.5px] text-[var(--muted)]">{branch.telefono}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                        {branch.direccion}
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                        {branch.horario_atencion}
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
                            onClick={() => handleToggleActive(branch)}
                            role="switch"
                            aria-checked={branch.activo}
                            title={branch.activo ? 'Deshabilitar sede' : 'Habilitar sede'}
                            className={`relative inline-flex h-[22px] w-[40px] items-center rounded-full border transition-colors duration-200 flex-shrink-0 ${
                              branch.activo
                                ? 'bg-[var(--accent)] border-[var(--accent)]'
                                : 'bg-[var(--surface-2)] border-[var(--border)]'
                            }`}
                          >
                            <span
                              className={`inline-block h-[16px] w-[16px] transform rounded-full bg-[var(--card)] shadow transition-transform duration-200 ${
                                branch.activo ? 'translate-x-[19px]' : 'translate-x-[2px]'
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
                  itemsCount={branches.length}
                  totalItems={pagination.totalItems}
                  label="sedes"
                />
              </div>
            </>
          )}
        </div>
      </main>

      <CreateBranchModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedBranch(null);
        }}
        onSave={handleSaveBranch}
      />

      <EditBranchModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
        onSave={handleUpdateBranch}
      />

      <DisableBranchModal
        open={showDisable}
        onClose={() => {
          setShowDisable(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
        onConfirm={confirmToggleActive}
      />

      <EnableBranchModal
        open={showEnable}
        onClose={() => {
          setShowEnable(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
        onConfirm={confirmToggleActive}
      />
    </div>
  );
};

export default Branches;