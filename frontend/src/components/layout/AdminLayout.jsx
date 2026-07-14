import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface)]">
      <AdminHeader />

    <main className="flex-1">
        <Outlet />
    </main>

      <AdminFooter />
    </div>
  );
};

export default AdminLayout;