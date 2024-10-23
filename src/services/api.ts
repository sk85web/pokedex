import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pokemon, TypeInfo } from '../types/type';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (page: number): Promise<{ pokemons: Pokemon[]; count: number }> => {
    const offset = (page - 1) * 20;
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=20`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const count = data.count;

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon: { url: string }) => {
        const detailsResponse = await fetch(pokemon.url);
        const details = await detailsResponse.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          type: details.types
            .map((typeInfo: TypeInfo) => typeInfo.type.name)
            .join(', '),
        };
      })
    );

    return { pokemons: detailedPokemons, count };
  }
);

export const searchPokemon = createAsyncThunk(
  'pokemons/searchPokemons',
  async (query: string): Promise<Pokemon | null> => {
    const response = await fetch(`${BASE_URL}/pokemon/${query}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      type: data.types
        .map((typeInfo: TypeInfo) => typeInfo.type.name)
        .join(', '),
    };
  }
);
