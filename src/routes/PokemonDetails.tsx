import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

import type { PokemonDetails } from '../types/type';
import { getPokemonDetails } from '../services/api';

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      if (typeof id === 'string') {
        const numericId = parseInt(id, 10);
        const details = await getPokemonDetails(numericId);
        setPokemon(details);
      } else {
        console.error('Invalid Pokémon ID');
      }
    } catch (error) {
      console.error('Failed to load Pokémon details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPokemonDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  if (!pokemon) {
    return <p>No Pokémon details available.</p>;
  }

  return (
    <div className="flex justify-center items-center flex-col mt-8 mb-8 rounded-full">
      <div className="mt-4 text-black bg-white rounded-3xl shadow-xl pt-0 pb-5 border-4 border-amber-400 overflow-hidden">
        <h2 className="rainbow-text uppercase text-2xl text-center font-bold pb-1 my-4 tracking-wide text-amber-300 bg-gray-700 mt-0 w-full">
          {pokemon.name}
        </h2>
        <div className="flex justify-center mb-6">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-52 h-52 rounded-full border-4 border-red-500 shadow-lg transition-transform duration-500 transform hover:scale-110"
          />
        </div>
        <div className="text-lg text-center space-y-2 px-6">
          <p>
            <span className="font-bold text-red-500">ID: </span> {pokemon.id}
          </p>
          <p>
            <span className="font-bold text-blue-500">Base Experience: </span>
            {pokemon.baseExperience}
          </p>
          <p>
            <span className="font-bold text-yellow-500">Height: </span>
            {pokemon.height}
          </p>
          <p>
            <span className="font-bold text-green-500">Weight: </span>
            {pokemon.weight}
          </p>
          <p>
            <span className="font-bold text-purple-500">Types: </span>
            {pokemon.types.join(', ')}
          </p>
          <p>
            <span className="font-bold text-pink-500">Abilities: </span>
            {pokemon.abilities.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
