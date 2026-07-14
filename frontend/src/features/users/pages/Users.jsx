import { useState, useEffect } from 'react';

import userService from "../api/user.service";
import PageHeader from "@/components/ui/PageHeader";

import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import DisableUserModal from '../components/DisableUserModal';
import EnableUserModal from '../components/EnableUserModal';

import useUsers from '../hooks/useUsers';

import {
  Button,
  StatsCard,
  Pagination,
  EmptyState,
} from '@/components/ui';

const Users = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showEnable, setShowEnable] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    inactivos: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const {
    users,
    loading,
    pagination,
    loadUsers,
  } = useUsers();

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const data = await userService.getStats();
      setStats({
        total: data?.total ?? 0,
        activos: data?.activos ?? 0,
        inactivos: data?.inactivos ?? 0,
      });
    } catch (error) {
      console.error('Error al cargar las estadísticas de usuarios:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const statsCards = [
    { value: statsLoading ? '—' : stats.total, label: 'Usuarios totales' },
    { value: statsLoading ? '—' : stats.activos, label: 'Activos' },
    { value: statsLoading ? '—' : stats.inactivos, label: 'Inactivos' },
  ];

  const handleCreate = () => {
    setSelectedUser(null);
    setShowCreate(true);
  };

  const handleSaveUser = async (usuario) => {
    try {
      await userService.create(usuario);
      await loadUsers();
      await loadStats();
      setShowCreate(false);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const handleUpdateUser = async (usuario) => {
    try {
      await userService.update(usuario.id_usuario, usuario);
      await loadUsers();
      await loadStats();
      setShowEdit(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
    }
  };

  const handleToggleActive = (user) => {
    setSelectedUser(user);
    if (user.activo) {
      setShowDisable(true);
    } else {
      setShowEnable(true);
    }
  };

  const confirmToggleActive = async () => {
    try {
      if (selectedUser.activo) {
        await userService.remove(selectedUser.id_usuario);
      } else {
        await userService.reactivate(selectedUser.id_usuario);
      }
      await loadUsers();
      await loadStats();
      setShowDisable(false);
      setShowEnable(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
      alert('Error al cambiar el estado del usuario. Por favor, intenta de nuevo.');
    }
  };

  const statsIcons = [
    <svg key="0" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>,
    <svg key="1" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
    </svg>,
    <svg key="2" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" />
    </svg>,
    <svg key="3" className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M9 4v16" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <PageHeader
          title="Usuarios"
          description="Administra los datos de contacto de los miembros del gimnasio."
          action={
            <Button
              onClick={handleCreate}
              icon={
                <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            >
              Nuevo usuario
            </Button>
          }
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
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
          {loading ? (
            <div className="p-12 text-center">Cargando...</div>
          ) : users.length === 0 ? (
            <EmptyState
              icon={
                <svg className="w-16 h-16 stroke-current fill-none stroke-[2.2]" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M20 8v6" />
                  <path d="M17 11h6" />
                </svg>
              }
              title="No hay usuarios registrados"
              description="Aún no se ha creado ningún usuario."
              action={<Button onClick={handleCreate}>Nuevo usuario</Button>}
            />
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Nombre</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Correo</th>
                    <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Teléfono</th>
                    <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id_usuario} className="hover:bg-[var(--surface-2)] transition">
                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                            {user.nombre.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-[var(--text)]">{user.nombre}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                        {user.email}
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                        {user.telefono}
                      </td>

                      <td className="px-5 py-[15px] border-b border-[var(--border)]">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="w-[34px] h-[34px] rounded-[9px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition"
                          >
                            <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5Z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleToggleActive(user)}
                            role="switch"
                            aria-checked={user.activo}
                            title={user.activo ? 'Deshabilitar usuario' : 'Habilitar usuario'}
                            className={`relative inline-flex h-[22px] w-[40px] items-center rounded-full border transition-colors duration-200 flex-shrink-0 ${
                              user.activo
                                ? 'bg-[var(--accent)] border-[var(--accent)]'
                                : 'bg-[var(--surface-2)] border-[var(--border)]'
                            }`}
                          >
                            <span
                              className={`inline-block h-[16px] w-[16px] transform rounded-full bg-[var(--card)] shadow transition-transform duration-200 ${
                                user.activo ? 'translate-x-[19px]' : 'translate-x-[2px]'
                              }`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t border-[var(--border)] px-5 py-4">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItems}
                  itemsCount={users.length}
                  label="usuarios"
                  onPageChange={(page) => loadUsers(page)}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <CreateUserModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveUser}
      />

      <EditUserModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleUpdateUser}
      />

      <DisableUserModal
        open={showDisable}
        onClose={() => {
          setShowDisable(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onConfirm={confirmToggleActive}
      />

      <EnableUserModal
        open={showEnable}
        onClose={() => {
          setShowEnable(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onConfirm={confirmToggleActive}
      />
    </div>
  );
};

export default Users;