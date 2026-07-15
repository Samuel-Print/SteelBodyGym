import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../common/Icons';
import ThemeToggle from '../common/ThemeToggle';
import { useSearch } from '@/context/SearchContext';

import logo from '../../../public/logoWeb.png';


const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();

  const [usuario, setUsuario] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const submenuRef = useRef(null);

  const [expandedMobileItem, setExpandedMobileItem] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");

    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setIsDropdownOpen(false);

    navigate("/login");
  };

  // Devuelve las iniciales del nombre (primera + última palabra).
  // "Daniela Martinez" -> "DM" | "carlos martinez" -> "CM" | "Admin" -> "A"
  const getInitials = (nombre) => {
    if (!nombre) return "U";
    const partes = nombre.trim().split(/\s+/);
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  };

  const navItems = [
    { path: '/promotions', label: 'Promociones', icon: 'tag' },
    { path: '/plans', label: 'Planes', icon: 'credit-card' },
    {
      path: '/classes',
      label: 'Clases',
      icon: 'calendar',
      children: [
        {
          path: '/classes',
          label: 'Clases',
          icon: 'calendar',
          description: 'Horarios y cupos regulares',
        },
        {
          path: '/activities',
          label: 'Actividades',
          icon: 'zap',
          description: 'Eventos y sesiones puntuales',
        },
      ],
    },
    { path: '/branches', label: 'Sedes', icon: 'map-pin' },
    { path: '/users', label: 'Usuarios', icon: 'users' },
  ];

  const isActive = (path) => location.pathname === path;

  const isParentActive = (item) => {
    if (!item.children) return isActive(item.path);
    return item.children.some((child) => isActive(child.path));
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="container-custom">
        <div className="h-[76px] flex items-center gap-6">

          <div className="flex items-center gap-6 shrink-0">
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
            <nav className="hidden lg:flex items-center gap-[4px]" ref={submenuRef}>
              {navItems.map((item) => {
                if (item.children) {
                  const parentActive = isParentActive(item);
                  const isOpen = openSubmenu === item.path;

                  return (
                    <div key={item.path} className="relative">
                      <button
                        onClick={() => setOpenSubmenu(isOpen ? null : item.path)}
                        className={`flex items-center gap-2 px-[13px] py-[9px] rounded-[var(--radius-sm)] text-[0.92rem] font-medium transition duration-200 cursor-pointer ${
                          parentActive
                            ? 'bg-[var(--accent)] text-white'
                            : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                        }`}
                      >
                        <Icon name={item.icon} className="w-4 h-4" />
                        {item.label}
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div
                        className={`absolute left-0 mt-2 w-64 origin-top-left transition-all duration-150 ${
                          isOpen
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                        }`}
                      >
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[14px] shadow-xl overflow-hidden p-1.5">
                          {item.children.map((child) => {
                            const childActive = isActive(child.path);
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={() => setOpenSubmenu(null)}
                                className={`group flex items-start gap-3 rounded-[10px] px-3 py-2.5 transition-colors ${
                                  childActive
                                    ? 'bg-[var(--accent)]/10'
                                    : 'hover:bg-[var(--surface-2)]'
                                }`}
                              >
                                <div
                                  className={`w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 transition-colors [&_svg]:!w-4 [&_svg]:!h-4 ${
                                    childActive
                                      ? 'bg-[var(--accent)] text-white'
                                      : 'bg-[var(--surface-2)] text-[var(--muted)] group-hover:text-[var(--accent)]'
                                  }`}
                                >
                                  <Icon name={child.icon} className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`text-[0.88rem] font-semibold truncate ${
                                        childActive ? 'text-[var(--accent)]' : 'text-[var(--text)]'
                                      }`}
                                    >
                                      {child.label}
                                    </span>
                                    {childActive && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-[0.76rem] text-[var(--muted)] truncate">
                                    {child.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
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
                );
              })}
            </nav>
          </div>

          {/* Derecha */}
          <div className="flex items-center gap-[8px] ml-auto">

            {/* Buscador Desktop */}
            <div className="hidden xl:flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2 w-[320px]">
              <Icon name="search" className="w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="bg-transparent border-none outline-none text-[0.92rem] text-[var(--text)] pl-2 w-full placeholder-[var(--muted)]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[var(--muted)] hover:text-[var(--text)] transition"
                  aria-label="Limpiar búsqueda"
                >
                  <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Tema */}
            <ThemeToggle />

            {/* Usuario con Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {getInitials(usuario?.nombre)}
                </div>
                <svg
                  className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Avatar móvil (solo icono) */}
              <div className="sm:hidden w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-semibold text-sm">
                {getInitials(usuario?.nombre)}
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[var(--border)]">
                    <p className="text-sm font-semibold text-[var(--text)] truncate">{usuario?.nombre || "Administrador"}</p>
                    <p className="text-xs text-[var(--muted)] truncate">{usuario?.email}</p>
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
              {navItems.map((item) => {
                if (item.children) {
                  const parentActive = isParentActive(item);
                  const isExpanded = expandedMobileItem === item.path;

                  return (
                    <div key={item.path}>
                      <button
                        onClick={() => setExpandedMobileItem(isExpanded ? null : item.path)}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-[var(--radius-sm)] text-[0.95rem] font-medium transition duration-200 ${
                          parentActive
                            ? 'bg-[var(--accent)] text-white'
                            : 'text-[var(--text)] hover:bg-[var(--surface-2)]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon name={item.icon} className="w-5 h-5" />
                          {item.label}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div
                        className={`grid transition-all duration-200 ${
                          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-col gap-1 pl-4 pb-1">
                            {item.children.map((child) => {
                              const childActive = isActive(child.path);
                              return (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setExpandedMobileItem(null);
                                  }}
                                  className={`flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-sm)] text-sm transition-colors ${
                                    childActive
                                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
                                      : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                                  }`}
                                >
                                  <div
                                    className={`w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0 [&_svg]:!w-3.5 [&_svg]:!h-3.5 ${
                                      childActive
                                        ? 'bg-[var(--accent)] text-white'
                                        : 'bg-[var(--surface-2)] text-[var(--muted)]'
                                    }`}
                                  >
                                    <Icon name={child.icon} className="w-3.5 h-3.5" />
                                  </div>
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
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
                );
              })}

              {/* Buscador móvil */}
              <div className="flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2 mt-2 mx-4">
                <Icon name="search" className="w-4 h-4 text-[var(--muted)]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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