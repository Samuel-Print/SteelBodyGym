import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import Home from '../pages/public/Home';

// Páginas placeholder (las crearemos después)
import Login from '../features/auth/Login';
import Promotions from '../pages/admin/Promotions';
import Plans from '../pages/admin/plans/Plans';
import Classes from '../pages/admin/classes/Classes';
import Branches from '../pages/admin/branches/Branches';
import Users from '../features/users/pages/Users';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="terminos" element={<div className="container-custom py-20"><h1 className="section-title text-center">Términos y Condiciones</h1></div>} />
        <Route path="legal" element={<div className="container-custom py-20"><h1 className="section-title text-center">Documentos Legales</h1></div>} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Admin - Promotions */}
      <Route path="/promotions" element={<Promotions />} />

      <Route path="/plans" element={<Plans />} />

      <Route path="/classes" element={<Classes />} />

      <Route path="/branches" element={<Branches />} />

      <Route path="/users" element={<Users />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;