import { useSelector } from 'react-redux';

import CardsList from './CardsList';
import { RootState } from '../redux/store';

const FavoritesGallery = () => {
  const { favorites } = useSelector((state: RootState) => state.pokemons);

  return (
    <div>
      <CardsList pokemons={favorites} />
    </div>
  );
};

export default FavoritesGallery;
