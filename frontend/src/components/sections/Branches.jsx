import { useState } from 'react';
import { Icon } from '../common/Icons';
import { SEDES } from '../../data/data';

// ==========================
// Acordeón de horarios
// ==========================
const HorarioAccordion = ({ horario }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-[20px_280px] gap-3 justify-center items-start mx-auto">
      {/* Icono */}
      <Icon
        name="clock"
        className="w-4 h-4 text-[var(--accent)] mt-1"
      />

      {/* Contenido */}
      <div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer hover:text-[var(--accent)] transition-colors"
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
          <div className="border-l-2 border-[var(--accent)] pl-3 flex flex-col gap-1">
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
    </div>
  );
};

// ==========================
// Componente principal
// ==========================
const Branches = () => {
  return (
    <section id="sedes" className="py-[60px] md:py-[84px]">
      <div className="container-custom">
        {/* Encabezado */}
        <div className="section-head max-w-[760px] mx-auto text-center mb-16">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[var(--badge-bg)]
              px-[14px]
              py-[6px]
              text-[0.76rem]
              font-bold
              uppercase
              tracking-[2px]
              text-[#3696E5]
            "
          >
            <Icon name="map-pin" className="w-4 h-4" />
            Nuestras sedes
          </span>

          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">
            Encuéntranos cerca de ti
          </h2>

          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">
            Visita cualquiera de nuestras sedes y conoce nuestras instalaciones.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mx-auto ">
          {SEDES.map((sede, index) => (
            <div
              key={index}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 flex items-center"
            >
              {sede.nombre === 'Proximamente' ? (
                // ==========================
                // CARD PRÓXIMAMENTE
                // ==========================
                <div className="flex flex-col items-center justify-center text-center w-full py-6">
                <div className="w-14 h-14 rounded-full bg-[var(--badge-bg)] border border-[var(--border)] flex items-center justify-center mb-4">
                  <Icon
                    name="map-pin"
                    className="w-6 h-6 text-[var(--accent)] translate-y-[2px] translate-x-[2px]"
                  />
                </div>

                  <h3 className="text-2xl font-extrabold text-white">
                    Próximamente
                  </h3>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--badge-bg)] px-3 py-1.5">
                    <Icon
                      name="clock"
                      className="w-3.5 h-3.5 text-[var(--accent)]"
                    />
                    <span className="text-xs font-semibold text-[var(--accent)]">
                      Apertura próximamente
                    </span>
                  </div>
                </div>
              ) : (
                // ==========================
                // CARD NORMAL
                // ==========================
                <div className="w-full">
                  <h3 className="text-[1.15rem] font-bold text-center mb-5">
                    {sede.nombre}
                  </h3>

                  {/* Ubicación */}
                  <div className="grid grid-cols-[20px_280px] gap-3 justify-center items-start mx-auto mb-4">
                    <Icon
                      name="map-pin"
                      className="w-4 h-4 text-[var(--accent)] mt-1"
                    />

                    <span className="text-[0.85rem] text-[var(--muted)]">
                      {sede.ubicacion}
                    </span>
                  </div>

                  {/* Horario */}
                  <HorarioAccordion horario={sede.horario} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Google Maps */}
        <iframe
          className="w-full h-[340px] border-0 rounded-[var(--radius)] grayscale-[0.2]  mx-auto block"
          title="Mapa Steel Body Gym"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5952785151926!2d-75.67544409999999!3d4.8393431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3881d8f001e181%3A0xb5c6a976fef68ec1!2sSteel%20Body%20Gym!5e0!3m2!1ses-419!2sco!4v1782887111502!5m2!1ses-419!2sco"
        />

      </div>
    </section>
  );
};

export default Branches;