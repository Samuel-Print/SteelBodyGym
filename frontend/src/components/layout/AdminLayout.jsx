import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface)]">
      <AdminHeader />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;