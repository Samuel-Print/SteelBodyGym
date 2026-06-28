import { Icon } from '../common/Icons';
import { PROMOS, PLANS, money, fmtDate } from '../../data/data';

const Plans = () => {
  return (
    <section id="planes" className="py-[60px] md:py-[84px] bg-[var(--surface)]">
      <div className="container-custom">
        <div className="section-head max-w-[760px] mx-auto text-center mb-16">
          <span className=" inline-flex
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
              text-[#3696E5]">
            <Icon name="tag" className="w-4 h-4" />
            Planes y precios
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">Elige el plan ideal para ti</h2>
          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">Promociones vigentes y todos nuestros planes en una tabla clara y transparente.</p>
        </div>

        {/* Promociones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PROMOS.map((promo, index) => (
            <div key={index} className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-[26px] overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)]" />
              <span className="inline-flex items-center gap-[6px] text-[var(--accent)] font-bold text-[0.76rem] uppercase tracking-[1px]">
                <Icon name="tag" className="w-[14px] h-[14px]" />
                Promoción
              </span>
              <h4 className="text-[1.2rem] my-[10px] mb-[6px]">{promo.nombre}</h4>
              <p className="text-[var(--muted)] text-[0.92rem]">{promo.descripcion}</p>
              <span className="inline-flex items-center gap-[6px] mt-[14px] text-[0.8rem] text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-[5px] rounded-[30px] font-semibold">
                <Icon name="clock" className="w-[14px] h-[14px]" />
                Válida hasta {fmtDate(promo.caducacion)}
              </span>
            </div>
          ))}
        </div>

        {/* Tabla de Planes */}
        <div className="overflow-x-auto border border-[var(--border)] rounded-[var(--radius)] bg-[var(--surface)]">
          <table className="w-full border-collapse min-w-[540px] table-fixed">
            <thead>
              <tr>
                <th className="w-1/3 text-left px-[24px] py-[18px] border-b border-[var(--border)] bg-[var(--surface-2)] text-[0.96rem] font-bold font-head">
                  Plan
                </th>

                <th className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)] bg-[var(--surface-2)] text-[0.96rem] font-bold font-head">
                  Duración
                </th>

                <th className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)] bg-[var(--surface-2)] text-[0.96rem] font-bold font-head">
                  Precio
                </th>
              </tr>
            </thead>

            <tbody>
              {PLANS.map((plan, index) => (
                <tr
                  key={index}
                  className="hover:bg-[var(--surface-2)] transition"
                >
                  <td className="w-1/3 px-[24px] py-[18px] border-b border-[var(--border)] text-[0.96rem]">
                    {plan.nombre}
                  </td>

                  <td className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)] text-[0.96rem]">
                    {plan.tiempo}
                  </td>

                  <td className="w-1/3 text-center px-[24px] py-[18px] border-b border-[var(--border)]">
                    <span className="font-extrabold text-[var(--accent)] text-[1rem] font-head">
                      {money(plan.costo)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <a href="https://forms.gle/dRj8R6kRPGVxvCUf6" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-3 whitespace-nowrap h-[55px]">
            <Icon name="user-plus" />
            Inscríbete con tu plan
          </a>
        </div>
      </div>
    </section>
  );
};

export default Plans;