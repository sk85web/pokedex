import PokemonGallery from './PokemonGallery';

const Home = () => {
  return (
    <div className="grid  grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
      <div className="col-span-1 sm:col-span-3">{<PokemonGallery />}</div>
    </div>
  );
};

export default Home;
