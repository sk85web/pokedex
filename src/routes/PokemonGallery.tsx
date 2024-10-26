import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useCallback, useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import CardsList from '../components/CardsList';
import {
  setCurrentPage,
  resetPokemonState,
} from '../redux/slices/pokemonSlice';
import {
  fetchPokemons,
  searchPokemon,
  fetchPokemonsByType,
} from '../services/api';
import { FetchPokemonsResponse, Pokemon } from '../types/type';
import FilterBar from '../components/FilterBar';
import { Circles } from 'react-loader-spinner';

const PokemonGallery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, pokemonsList, currentPage } = useSelector(
    (state: RootState) => state.pokemons
  );

  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const totalCountRef = useRef(0);
  const pokemonsListLength = useRef(0);

  useEffect(() => {
    if (selectedType === 'All') {
      if (fetching) {
        dispatch(fetchPokemons(currentPage))
          .then((res) => {
            const result = res.payload as FetchPokemonsResponse;
            totalCountRef.current = result.count;
            pokemonsListLength.current += result.pokemons.length;
            dispatch(setCurrentPage());
          })
          .finally(() => setFetching(false));
      }
    } else {
      dispatch(fetchPokemonsByType(selectedType)).then((res) => {
        const result = res.payload as FetchPokemonsResponse;
        totalCountRef.current = result.count;
        pokemonsListLength.current = result.pokemons.length;
      });
    }
  }, [fetching, selectedType]);

  useEffect(() => {
    const debouncedScrollHandler = debounce(scrollHandler, 300);

    window.addEventListener('scroll', debouncedScrollHandler);
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
      debouncedScrollHandler.cancel();
    };
  }, []);

  const scrollHandler = (e: Event) => {
    const target = e.target as Document;
    if (
      !loading &&
      pokemonsListLength.current < totalCountRef.current &&
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
        200
    ) {
      setFetching(true);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    dispatch(resetPokemonState());
    setSelectedType('All');

    if (trimmedQuery === '') {
      setSearchedPokemon(null);
      setFetching(true);
      navigate('/');
    } else {
      navigate(`?search=${trimmedQuery}`);
    }

    try {
      const { payload: pokemon } = await dispatch(searchPokemon(trimmedQuery));
      if (pokemon) {
        setSearchedPokemon(pokemon as Pokemon);
        setError(null);
      } else {
        setSearchedPokemon(null);
      }
    } catch (error) {
      setError(`${error} Failed to fetch Pokémon data. Please try again.`);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery);
      handleSearch(searchQuery);
    }
  }, [handleSearch, searchQuery]);

  const handleFilterChange = (type: string) => {
    dispatch(resetPokemonState());
    setSelectedType(type);
    setSearchQuery('');
    setSearchedPokemon(null);
    setFetching(true);
  };

  if (error) {
    return <h2>Something went wrong. The error is {error}</h2>;
  }

  return (
    <main className="mx-2">
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-center mt-16 w-full">
          <SearchBar
            onSearch={(query) => handleSearch(query)}
            searchQuery={searchQuery}
          />
        </div>
        <FilterBar onChange={handleFilterChange} selectedType={selectedType} />
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-16">
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
        </div>
      )}
      <CardsList
        pokemons={searchedPokemon ? [searchedPokemon] : pokemonsList}
      />
    </main>
  );
};

export default PokemonGallery;
