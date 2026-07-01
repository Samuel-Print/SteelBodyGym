import { Link } from 'react-router-dom';
import { Icon } from '../common/Icons';

import logo from '../../../public/logoWeb.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] pt-12 pb-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between gap-6 flex-wrap">
          <div>
            <Link to="/" className="flex items-center gap-[11px] font-extrabold text-[1.2rem] font-head">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-[45px] h-[45px]"
                />
              Steel Body <span className="text-[var(--accent)]">Gym</span>
            </Link>
            <p className="text-[var(--muted)] text-[0.9rem] mt-3 max-w-[300px]">
              Forja tu mejor versión con disciplina, esfuerzo y la mejor comunidad fitness.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 flex-wrap items-start sm:items-center">
            <Link to="/terminos" className="text-[var(--muted)] text-[0.9rem] hover:text-[var(--accent)] transition">
              Términos y Condiciones
            </Link>
            <Link to="/legal" className="text-[var(--muted)] text-[0.9rem] hover:text-[var(--accent)] transition">
              Política de Privacidad
            </Link>
            <a href="https://www.instagram.com/steelbodygym1/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] text-[0.9rem] hover:text-[var(--accent)] transition">
              Instagram
            </a>
            <Link to="/login" className="text-[var(--muted)] text-[0.9rem] hover:text-[var(--accent)] transition">
              Acceso Admin
            </Link>
          </div>
        </div>

        <div className="text-center text-[var(--muted)] text-[0.82rem] mt-8 pt-5 border-t border-[var(--border)]">
          © {currentYear} Steel Body Gym. <span className="font-semibold text-[var(--text)]">ProGangster</span> Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;