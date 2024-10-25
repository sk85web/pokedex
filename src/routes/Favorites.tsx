import FavoritesGallery from '../components/FavoritesGallery';

const Favorites = () => {
  return (
    <div className="grid  grid-cols-2 sm:grid-cols-4 gap-2">
      <div className="col-span-1 sm:col-span-3">{<FavoritesGallery />}</div>
    </div>
  );
};

export default Favorites;
