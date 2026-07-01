import { useState } from 'react'; 
import { Icon } from '../common/Icons';
import { SEDES } from '../../data/data';

const HorarioAccordion = ({ horario }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer hover:text-[var(--accent)] transition-colors"
      >
        <span className="text-[0.85rem] text-[var(--muted)]">
          {horario.principal}
        </span>
        <Icon
          name="chevron-down"
          className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-2' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 pl-3 border-l-2 border-[var(--accent)]">
          {horario.completo.slice(1).map((hora, i) => (
            <span
              key={i}
              className="text-[0.82rem] text-[var(--muted)]"
            >
              {hora}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contacto" className="py-[60px] md:py-[84px] bg-[var(--surface)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-9 items-start">
          {/* Info de contacto */}
          <div>
            <span className="inline-flex
              items-center
              gap-2
              rounded-full
              bg-[var(--badge-bg)]
              px-[14px]
              py-[6px]
              mb-2
              text-[0.76rem]
              font-bold
              uppercase
              tracking-[2px]
              text-[#3696E5]">
              <Icon name="phone" className="w-4 h-4" />
              Contacto
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] mb-6 font-head font-bold text-[var(--text-h)]">
              Estamos para ayudarte
            </h2>

            <div className="flex gap-3.5 mb-5 items-center">
              <div className="w-[44px] h-[44px] rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center flex-shrink-0">
                <Icon name="map-pin" className="w-5 h-5" />
              </div>
              <div>
                <strong>Dirección</strong>
                <span className="block text-[var(--muted)] text-[0.9rem]">Cl. 37 #8 - 24, Dosquebradas, Risaralda</span>
              </div>
            </div>

            <div className="flex gap-3.5 mb-5 items-center">
              <div className="w-[44px] h-[44px] rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center flex-shrink-0">
                <Icon name="phone" className="w-5 h-5" />
              </div>
              <div>
                <strong>Teléfono</strong>
                <span className="block text-[var(--muted)] text-[0.9rem]">+57 312 258 8668</span>
              </div>
            </div>

            <div className="flex gap-3.5 mb-5 items-center">
              <div className="w-[44px] h-[44px] rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center flex-shrink-0">
                <Icon name="mail" className="w-5 h-5" />
              </div>
              <div>
                <strong>Correo</strong>
                <span className="block text-[var(--muted)] text-[0.9rem]">steelbodygym2024@gmail.com</span>
              </div>
            </div>

            {/* Atención - ajustado para mejor alineación */}
            <div className="flex gap-3.5 mb-5">
              <div className="w-[44px] h-[44px] rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center flex-shrink-0">
                <Icon name="clock" className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <strong className="block mb-2">
                  Atención
                </strong>
                <HorarioAccordion horario={SEDES[0].horario} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/steelbodygym1/" target="_blank" rel="noopener noreferrer" className="w-[46px] h-[46px] rounded-[12px] bg-[var(--surface-2)] grid place-items-center border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition duration-200">
                <Icon name="instagram" className="w-[22px] h-[22px]" />
              </a>
              <a href="https://forms.gle/dRj8R6kRPGVxvCUf6" target="_blank" rel="noopener noreferrer" className="w-[46px] h-[46px] rounded-[12px] bg-[var(--surface-2)] grid place-items-center border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition duration-200">
                <Icon name="clipboard" className="w-[22px] h-[22px]" />
              </a>
            </div>
          </div>

          {/* Card de inscripción */}
          <div className="card p-6">
            <div className="w-[54px] h-[54px] rounded-[13px] bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center mb-4">
              <Icon name="user-plus" className="w-[26px] h-[26px]" />
            </div>
            <h3 className="text-[1.2rem] mb-2 font-head font-bold text-[var(--text-h)]">¿Listo para empezar?</h3>
            <p className="text-[var(--muted)] mb-5">Llena nuestro formulario de inscripción en línea y un asesor se pondrá en contacto contigo.</p>
            <a href="https://forms.gle/dRj8R6kRPGVxvCUf6" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">
              Ir al formulario de inscripción
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;