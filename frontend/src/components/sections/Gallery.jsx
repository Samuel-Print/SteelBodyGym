import { Icon } from '../common/Icons';
import { IMGS } from '../../data/data';

const Gallery = () => {
  return (
    <section id="galeria" className="py-[60px] md:py-[84px]">
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
            <Icon name="instagram" className="w-4 h-4" />
            Síguenos
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-extrabold font-head">Galería y redes sociales</h2>
          <p className="mt-5 max-w-[640px] mx-auto text-[1.12rem] text-[var(--muted)] leading-8">
            Mira nuestras publicaciones más recientes en{' '}
            <a href="https://www.instagram.com/steelbodygym1/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] font-bold">
              @steelbodygym1
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {IMGS.map((img, index) => (
            <a 
              key={index}
              href="https://www.instagram.com/steelbodygym1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative rounded-[var(--radius)] overflow-hidden border border-[var(--border)] aspect-square hover:scale-[1.02] transition-transform duration-300"
            >
              <img 
                src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=400&q=70`}
                alt="Publicación de Steel Body Gym"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-400"
              />
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="https://www.instagram.com/steelbodygym1/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-3 whitespace-nowrap h-[55px]">
            <Icon name="instagram" />
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;