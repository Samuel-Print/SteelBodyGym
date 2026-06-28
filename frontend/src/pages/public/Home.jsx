import Hero from '../../components/sections/Hero';
import Benefits from '../../components/sections/Benefits';
import Plans from '../../components/sections/Plans';
import Branches from '../../components/sections/Branches';
import Classes from '../../components/sections/Classes';
import Gallery from '../../components/sections/Gallery';
import Contact from '../../components/sections/Contact';

const Home = () => {
  return (
    <div>
      <Hero />
      <Benefits />
      <Plans />
      <Branches />
      <Classes />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Home;