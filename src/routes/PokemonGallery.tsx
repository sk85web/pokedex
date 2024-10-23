import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../components/SearchBar';
import { AppDispatch, RootState } from '../redux/store';
import CardsList from '../components/CardsList';
import { useEffect } from 'react';
import { fetchPokemons } from '../redux/slices/pokemonSlice';

const PokemonGallery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, pokemonsList } = useSelector(
    (state: RootState) => state.pokemons
  );

  useEffect(() => {
    dispatch(fetchPokemons(1));
  }, [dispatch]);

  return (
    <main className="mx-2">
      <div className="flex justify-center items-center mt-16">
        <SearchBar />
      </div>
      {loading && <p>Loading...</p>}
      <CardsList pokemons={pokemonsList} />
    </main>
  );
};

export default PokemonGallery;
