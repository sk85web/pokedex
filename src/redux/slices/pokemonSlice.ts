import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Pokemon, TypeInfo } from '../../types/type';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (page: number): Promise<Pokemon[]> => {
    const offset = (page - 1) * 20;
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=20`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

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

    console.log('Detailed Pokemons:', detailedPokemons);

    return detailedPokemons;
  }
);

interface PokemonsState {
  pokemonsList: Pokemon[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchQuery: string;
  selectedTypes: string[];
  favorites: Pokemon[];
}

const initialState: PokemonsState = {
  pokemonsList: [],
  loading: false,
  error: null,
  currentPage: 1,
  searchQuery: '',
  selectedTypes: [],
  favorites: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Pokemon>) => {
      state.favorites.push(action.payload);
    },
    removeFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedTypes: (state, action: PayloadAction<string[]>) => {
      state.selectedTypes = action.payload;
    },
    resetPokemonState: (state) => {
      state.pokemonsList = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemons.fulfilled,
        (state, action: PayloadAction<Pokemon[]>) => {
          state.loading = false;
          state.pokemonsList = action.payload;
          state.currentPage += 1;
        }
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  addFavorite,
  removeFavorites,
  setSearchQuery,
  setSelectedTypes,
  resetPokemonState,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
