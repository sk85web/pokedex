import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pokemon, TypeInfo, PokemonType } from '../types/type';

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

export const getAllTypes = createAsyncThunk(
  'pokemons/getAllTypes',
  async (): Promise<string[]> => {
    const fetchAllTypes = async (
      url: string,
      accumulatedTypes: string[] = []
    ): Promise<string[]> => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const types = data.results.map((result: PokemonType) => result.name);
      const allTypes = [...accumulatedTypes, ...types];

      if (data.next) {
        return fetchAllTypes(data.next, allTypes);
      }

      return allTypes;
    };

    return await fetchAllTypes(`${BASE_URL}/type`);
  }
);

export const fetchPokemonsByType = createAsyncThunk(
  'pokemons/fetchPokemonsByType',
  async (type: string): Promise<{ pokemons: Pokemon[]; count: number }> => {
    const response = await fetch(`${BASE_URL}/type/${type}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const pokemons = data.pokemon.map(
      (p: { pokemon: { name: string; url: string } }) => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
      })
    );
    const count = pokemons.length;

    const detailedPokemons = await Promise.all(
      pokemons.map(async (pokemon: { url: string }) => {
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
