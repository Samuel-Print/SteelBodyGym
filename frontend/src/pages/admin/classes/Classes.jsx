import { useState } from 'react';
import AdminHeader from '../../../components/layout/AdminHeader';
import AdminFooter from '../../../components/layout/AdminFooter';

import CreateClassModal from './CreateClassModal';
import EditClassModal from './EditClassModal';
import DeleteClassDialog from './DeleteClassDialog';

import {
  Button,
  StatsCard,
} from '../../../components/ui';

const Classes = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Spinning',
      datetime: '2026-06-29T06:00',
      duration: 45,
      location: 'Sala de cardio',
      status: 'Activa',
      badge: 'green',
    },
    {
      id: 2,
      name: 'Funcional',
      datetime: '2026-06-29T19:00',
      duration: 60,
      location: 'Zona funcional',
      status: 'Activa',
      badge: 'green',
    },
    {
      id: 3,
      name: 'Yoga',
      datetime: '2026-06-30T08:00',
      duration: 75,
      location: 'Salón 2',
      status: 'Activa',
      badge: 'green',
    },
    {
      id: 4,
      name: 'Crossfit',
      datetime: '2026-07-01T18:30',
      duration: 50,
      location: 'Box principal',
      status: 'Cupo lleno',
      badge: 'amber',
    },
    {
      id: 5,
      name: 'Zumba',
      datetime: '2026-07-02T17:00',
      duration: 55,
      location: 'Salón 1',
      status: 'Activa',
      badge: 'green',
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

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString('es-CO', { weekday: 'short', day: '2-digit', month: 'short' }),
      time: date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const stats = [
    { value: classes.length, label: 'Clases semanales' },
    { value: '60 min', label: 'Duración media' },
    { value: 'Spinning', label: 'Más popular' },
  ];

  const handleCreate = () => {
    setSelectedClass(null);
    setShowCreate(true);
  };

  const handleEdit = (cls) => {
    setSelectedClass(cls);
    setShowEdit(true);
  };

  const handleDelete = (cls) => {
    setSelectedClass(cls);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setClasses(classes.filter((c) => c.id !== selectedClass.id));
    setShowConfirm(false);
    setSelectedClass(null);
  };

  const statsIcons = [
    // Clases semanales
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>,
    // Duración media
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>,
    // Más popular
    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z" />
    </svg>,
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminHeader />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex items-end justify-between gap-5 flex-wrap mb-6">
          <div>
            <h1 className="text-[26px] font-head font-extrabold text-[var(--text)]">
              Clases
            </h1>
            <p className="text-[var(--muted)] text-sm mt-1">
              Programa y administra las clases dirigidas del gimnasio.
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
            Nueva clase
          </Button>
        </div>

        {/* Stats */}
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
                  Horario (fecha y hora)
                </th>
                <th className="text-left text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Duración
                </th>
                <th className="text-right text-[11.5px] uppercase tracking-[0.05em] text-[var(--muted)] font-bold px-5 py-3.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => {
                const { date, time } = formatDateTime(cls.datetime);
                return (
                  <tr key={cls.id} className="hover:bg-[var(--surface-2)] transition">
                    <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-[38px] h-[38px] rounded-[10px] bg-[var(--info-bg)] text-[var(--primary-light)] flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                          {cls.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text)]">{cls.name}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm">
                      <div className="font-bold text-[var(--text)]">
                        {date} · {time}
                      </div>
                    </td>

                    <td className="px-5 py-[15px] border-b border-[var(--border)] text-sm text-[var(--text)]">
                      {cls.duration} min
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
                          onClick={() => handleDelete(cls)}
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
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-5 py-3.5 border-t border-[var(--border)] text-[13px] text-[var(--muted)]">
            <span>Mostrando {classes.length} de {classes.length} clases</span>
          </div>
        </div>
      </main>

      <AdminFooter />

      <CreateClassModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
      />

      <EditClassModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
      />

      <DeleteClassDialog
        open={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setSelectedClass(null);
        }}
        classData={selectedClass}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Classes;