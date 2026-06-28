import { Icon } from '../common/Icons';
import { SEDES } from '../../data/data';

const Branches = () => {
  return (
    <section id="sedes" className="py-[60px] md:py-[84px]">
      <div className="container-custom">
        <div className="section-head max-w-[760px] mx-auto text-center mb-16">
          <span className="
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
            ">
            <Icon name="map-pin" className="w-4 h-4" />
            Nuestras sedes
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">Encuéntranos cerca de ti</h2>
          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">Visita cualquiera de nuestras sedes y conoce nuestras instalaciones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {SEDES.map((sede, index) => (
            <div key={index} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6">
              <h3 className="text-[1.2rem] mb-3">{sede.nombre}</h3>
              <div className="flex items-start gap-2.5 text-[var(--muted)] text-[0.92rem] mb-2">
                <Icon name="map-pin" className="w-[18px] h-[18px] text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>{sede.ubicacion}</span>
              </div>
              <div className="flex items-start gap-2.5 text-[var(--muted)] text-[0.92rem]">
                <Icon name="clock" className="w-[18px] h-[18px] text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span>{sede.horario}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mapa embebido de Google */}
        <iframe 
          className="w-full h-[340px] border-0 rounded-[var(--radius)] grayscale-[0.2]"
          title="Mapa Steel Body Gym" 
          loading="lazy" 
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade" 
          src="https://www.google.com/maps?q=gimnasio&output=embed"
        />
      </div>
    </section>
  );
};

export default Branches;