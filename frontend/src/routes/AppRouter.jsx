import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from '@/components/layout/PublicLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import ProtectedRoute from "@/components/routing/ProtectedRoute";


import Home from '../pages/public/Home';

import Login from '../features/auth/pages/Login';
import Promotions from '../pages/admin/Promotions';
import Plans from '../features/plans/pages/Plans';
import Classes from '../features/classes/pages/Classes';
import Branches from '../features/branches/pages/Branches';
import Users from '../features/users/pages/Users';
import RecoverPassword from "@/features/auth/pages/RecoverPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import Activities from "../features/activities/pages/activities";

const AppRouter = () => {
  return (
    <Routes>

        {/* Públicas */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="terminos" element={<Terminos />} />
          <Route path="legal" element={<Legal />} /> */}
          <Route path="/recuperar-password" element={<RecoverPassword />} />
          <Route path="/resetear-password" element={<ResetPassword />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRouter;