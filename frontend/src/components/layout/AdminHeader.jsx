import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../common/Icons';
import ThemeToggle from '../common/ThemeToggle';

import logo from '../../../public/logoWeb.png';


const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const data = localStorage.getItem("usuario");

    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setIsDropdownOpen(false);

    navigate("/login");
  };

  const navItems = [
    { path: '/promotions', label: 'Promociones', icon: 'tag' },
    { path: '/plans', label: 'Planes', icon: 'credit-card' },
    { path: '/classes', label: 'Clases', icon: 'calendar' },
    { path: '/branches', label: 'Sedes', icon: 'map-pin' },
    { path: '/users', label: 'Usuarios', icon: 'users' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="container-custom">
        <div className="h-[76px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/promotions"
            className="flex items-center gap-3 shrink-0"
          >
             <img 
                src={logo} 
                alt="Logo" 
                className="w-[45px] h-[45px] "
              />

            <h1 className="font-head font-bold text-[1.4rem] leading-none">
              <span className="text-[var(--text)]">Steel Body</span>{' '}
              <span className="text-[var(--accent)]">Gym</span>
            </h1>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-[4px]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-[13px] py-[9px] rounded-[var(--radius-sm)] text-[0.92rem] font-medium transition duration-200 ${
                  isActive(item.path)
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                <Icon name={item.icon} className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Derecha */}
          <div className="flex items-center gap-[8px] ml-auto">

            {/* Buscador Desktop */}
            <div className="hidden xl:flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2 w-[320px]">
              <Icon name="search" className="w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-none outline-none text-[0.92rem] text-[var(--text)] pl-2 w-full placeholder-[var(--muted)]"
              />
            </div>

            {/* Tema */}
            <ThemeToggle />

            {/* Usuario con Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-semibold text-sm">
                  {usuario?.nombre?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden sm:block text-[0.92rem] font-medium text-[var(--text)]">
                  {usuario?.nombre || "Usuario"}
                </span>
                <svg
                  className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Avatar móvil (solo icono) */}
              <div className="sm:hidden w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-semibold text-sm">
                A
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[var(--border)]">
                    <p className="text-sm font-semibold text-[var(--text)]">Administrador</p>
                    <p className="text-xs text-[var(--muted)]">{usuario?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            {/* Botón Hamburguesa - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] text-[var(--text)] hover:bg-[var(--surface-2)] transition"
              aria-label="Menú"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className="w-6 h-6 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>

          </div>

        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border)]">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] text-[0.95rem] font-medium transition duration-200 ${
                    isActive(item.path)
                      ? 'bg-[var(--accent)] text-white'
                      : 'text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <Icon name={item.icon} className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}

              {/* Buscador móvil */}
              <div className="flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2 mt-2 mx-4">
                <Icon name="search" className="w-4 h-4 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none text-[0.92rem] text-[var(--text)] pl-2 w-full placeholder-[var(--muted)]"
                />
              </div>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default AdminHeader;