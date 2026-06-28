import { Icon } from '../common/Icons';
import { BENEFITS } from '../../data/data';

const Benefits = () => {
  return (
    <section id="beneficios" className="py-[60px] md:py-[84px]">
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
            <Icon name="sparkles" className="w-4 h-4" />
            POR QUÉ ELEGIRNOS
          </span>

          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">
            Todo lo que necesitas para entrenar
          </h2>

          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">
            Diseñamos cada detalle para que alcances tus objetivos más rápido y disfrutes el proceso.
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="
                group
                bg-[var(--surface)]
                border
                border-[var(--border)]
                rounded-[20px]
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-lg
                hover:border-[#D7E5F6]
              "
            >
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center mb-[18px]">
                <Icon
                  name={benefit.ico}
                  className="w-[24px] h-[24px]"
                />
              </div>

              <h3 className="text-[1.2rem] font-bold mb-[10px]">
                {benefit.title}
              </h3>

              <p className="text-[1rem] leading-7 text-[var(--muted)]">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;