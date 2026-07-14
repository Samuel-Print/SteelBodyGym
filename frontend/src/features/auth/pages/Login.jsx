import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import useAuth from "@/features/auth/hooks/useAuth";

const Login = () => {

  const navigate = useNavigate();

  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await login({
        email,
        password,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        navigate("/promotions"); // o la ruta principal de tu admin
    } catch (error) {
        console.error(error);
    }
    };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Background con overlay */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(rgba(0,0,1,.55), rgba(0,0,1,.78)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80") center/cover fixed'
        }}
      />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 w-10 h-10 grid place-items-center rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-200 z-50"
        title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        )}
      </button>

      {/* Modal */}
      <div className="w-full max-w-[420px] bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius)] shadow-[var(--shadow)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3 font-head font-extrabold text-[1.15rem]">
            <span className="w-[38px] h-[38px] rounded-[11px] bg-[var(--accent)] grid place-items-center text-white">
              <svg className="w-[22px] h-[22px] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                <rect width="18" height="11" x="3" y="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            Acceso administrativo
          </div>
          <Link 
            to="/" 
            className="w-[38px] h-[38px] grid place-items-center rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-200"
            title="Cerrar"
          >
            <svg className="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </Link>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-[var(--muted)] text-[0.94rem] mb-6">
            Ingresa tus credenciales para acceder al panel de administración de Steel Body Gym.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-[0.86rem] font-semibold mb-[7px]">
                Usuario o correo
              </label>
              <div className="relative flex items-center">
                <svg className="absolute left-3 w-[18px] h-[18px] text-[var(--muted)] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  type="email"
                  id="user"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--text)] font-body text-[0.95rem] transition-all duration-200 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
                  placeholder="admin@steelbody.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-[0.86rem] font-semibold mb-[7px]">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <svg className="absolute left-3 w-[18px] h-[18px] text-[var(--muted)] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <rect width="18" height="11" x="3" y="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type="password"
                  id="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--text)] font-body text-[0.95rem] transition-all duration-200 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center gap-2.5 text-[0.96rem] py-[13px]"
            >
              <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <path d="m10 17 5-5-5-5M15 12H3"/>
              </svg>
              Ingresar
            </button>
          </form>
        </div>

       {/* Modal Footer */}
        <div className="px-6 pb-4 text-center">
          <Link to="/recuperar-password" className="text-[var(--accent)] text-[0.86rem] hover:underline transition">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="px-6 pb-6 text-center">
          <Link to="/" className="text-[var(--muted)] text-[0.86rem] hover:text-[var(--accent)] transition">
            Volver al sitio público
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;