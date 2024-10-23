import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import SearchBar from '../components/SearchBar';
import CardsList from '../components/CardsList';
import { fetchPokemons, setCurrentPage } from '../redux/slices/pokemonSlice';

const PokemonGallery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, pokemonsList, currentPage, totalCount } = useSelector(
    (state: RootState) => state.pokemons
  );

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      dispatch(fetchPokemons(currentPage))
        .then(() => dispatch(setCurrentPage()))
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    const debouncedScrollHandler = debounce(scrollHandler, 300);

    document.addEventListener('scroll', debouncedScrollHandler);
    return () => {
      document.removeEventListener('scroll', debouncedScrollHandler);
      debouncedScrollHandler.cancel();
    };
  }, []);

  const scrollHandler = (e: Event) => {
    const target = e.target as Document;
    if (
      !loading &&
      pokemonsList.length === totalCount &&
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
        100
    ) {
      setFetching(true);
    }
  };

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
