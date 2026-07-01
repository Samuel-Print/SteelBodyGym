import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../common/Icons';
import ThemeToggle from '../common/ThemeToggle';

import logo from '../../../public/logoWeb.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/#beneficios', label: 'Beneficios' },
    { to: '/#planes', label: 'Planes' },
    { to: '/#sedes', label: 'Sedes' },
    { to: '/#clases', label: 'Clases' },
    { to: '/#galeria', label: 'Galería' },
    { to: '/#contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-[12px] border-b border-[var(--border)]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-[11px] font-extrabold text-[1.2rem] font-head shrink-0"
          >
             <img 
                src={logo} 
                alt="Logo" 
                className="w-[45px] h-[45px] "
              />
            <h2>Steel Body <span className="text-[var(--accent)]">Gym</span></h2>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-[6px]">
            {/* Navegación Desktop */}
            <nav className="hidden md:flex gap-[4px] items-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  className="px-[13px] py-[9px] rounded-[var(--radius-sm)] text-[var(--muted)] font-medium text-[0.92rem] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Botón Inscríbete */}
            <a
              href="https://forms.gle/dRj8R6kRPGVxvCUf6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-sm hidden sm:inline-flex"
            >
              Inscríbete
            </a>

            {/* Admin */}
            <Link
              to="/login"
              className="w-10 h-10 grid place-items-center rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-200"
              title="Acceso administrativo"
              aria-label="Admin"
            >
              <Icon name="lock" />
            </Link>

            {/* Tema */}
            <ThemeToggle />

            {/* Botón Hamburguesa - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] text-[var(--text)] hover:bg-[var(--surface-2)] transition"
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
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-[var(--radius-sm)] text-[var(--text)] text-[0.95rem] font-medium hover:bg-[var(--surface-2)] transition duration-200"
                >
                  {link.label}
                </a>
              ))}

              {/* Botón Inscríbete en móvil */}
              <a
                href="https://forms.gle/dRj8R6kRPGVxvCUf6"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full text-center mt-2"
              >
                Inscríbete
              </a>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;