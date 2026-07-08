import { useState } from 'react';
import AdminHeader from '@/components/layout/AdminHeader';
import AdminFooter from '@/components/layout/AdminFooter';
import PageHeader from "@/components/ui/PageHeader";

import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import DeleteUserDialog from '../components/DeleteUserDialog';

import useUsers from '../hooks/useUsers';

import {
  Button,
  StatsCard,
} from '@/components/ui';

const Users = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    users,
    loading,
    loadUsers,
  } = useUsers();

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
    { value: users.length, label: 'Usuarios totales' },
    { value: '318', label: 'Activos' },
    { value: '+28', label: 'Nuevos este mes' },
    { value: '24', label: 'Inactivos' },
  ];

  const handleCreate = () => {
    setSelectedUser(null);
    setShowCreate(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const statsIcons = [
    // Usuarios totales
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>,
    // Activos
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
    </svg>,
    // Nuevos este mes
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" />
    </svg>,
    // Inactivos
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M9 4v16" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminHeader />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <PageHeader
          title="Usuarios"
          description="Administra los datos de contacto de los miembros del gimnasio."
          action={
            <Button
              onClick={handleCreate}
              icon={
                <svg
                  className="w-4 h-4 stroke-current fill-none stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            >
              Nuevo usuario
            </Button>
          }
        />

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
                  Correo
                </th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Teléfono
                </th>
                <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--surface-2)] transition">
                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[var(--text)]">{user.name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                    {user.email}
                  </td>

                  <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                    {user.phone}
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
                        onClick={() => handleDelete(user)}
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
            <span>Mostrando {users.length} de 342 usuarios</span>
          </div>
        </div>
      </main>

      <AdminFooter />

      <CreateUserModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <EditUserModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <DeleteUserDialog
        open={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Users;