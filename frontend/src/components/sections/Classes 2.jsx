import { Icon } from '../common/Icons';
import { CLASSES, fmtDateTime } from '../../data/data';

const Classes = () => {
  return (
    <section id="clases" className="py-[60px] md:py-[84px] bg-[var(--surface)]">
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
            <Icon name="calendar" className="w-4 h-4" />
            Horarios de clases
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">Clases y actividades</h2>
          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">Reserva tu lugar en nuestras clases dirigidas semanales.</p>
        </div>

        <div className="grid gap-4">
          {CLASSES.map((cls, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-[18px_22px]">
              <div className="flex items-center gap-[14px]">
                <div className="w-[44px] h-[44px] rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center flex-shrink-0">
                  <Icon name="activity" className="w-[22px] h-[22px]" />
                </div>
                <div>
                  <strong>{cls.nombre}</strong>
                  <div className="text-[var(--muted)] text-[0.85rem]">Duración: {cls.duracion}</div>
                </div>
              </div>
              <span className="text-[var(--accent)] font-bold text-[0.9rem] sm:text-right">
                {fmtDateTime(cls.horario)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes;