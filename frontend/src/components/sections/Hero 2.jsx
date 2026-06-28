import { Icon } from '../common/Icons';

const Hero = () => {
  const stats = [
    { value: '2', label: 'Sedes activas' },
    { value: '+500', label: 'Miembros' },
    { value: '12', label: 'Clases semanales' },
    { value: '5am-10pm', label: 'Horario amplio' },
  ];

  return (
    <section className="relative text-center py-[80px] md:py-[130px] px-0">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(var(--hero-overlay-1), var(--hero-overlay-2)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80") center/cover'
        }}
      />

      <div className="container-custom">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 text-white font-bold tracking-[2px] uppercase text-[0.76rem] mb-3 bg-white/20 px-[14px] py-[6px] rounded-[30px]">
          <Icon name="flame" className="w-4 h-4 text-[var(--accent)]" />
          Forja tu mejor versión
        </span>

        {/* Title */}
        <h1 className="text-[clamp(2.4rem,6vw,4.4rem)] text-white font-extrabold font-head">
          Entrena duro en <span className="text-[var(--accent)]">Steel Body Gym</span>
        </h1>

        {/* Description */}
        <p className="text-white/80 max-w-[640px] mx-auto mt-5 mb-[34px] text-[1.12rem]">
          El gimnasio donde la disciplina se convierte en resultados. Equipos de última generación, entrenadores certificados y la energía que necesitas para superar tus límites.
        </p>

        {/* Actions */}
        <div className="flex gap-[14px] justify-center flex-wrap">
          <a
            href="https://forms.gle/dRj8R6kRPGVxvCUf6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-3 whitespace-nowrap h-[55px]"
          >
            <Icon name="user-plus" />
            <span>Inscríbete ahora</span>
          </a>
          <a
            href="#planes"
            className="btn-primary inline-flex items-center justify-center h-[55px] bg-transparent border border-white/30 text-white hover:bg-white/10 hover:shadow-none"
          >
            Ver planes y precios
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;