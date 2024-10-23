import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Pokemon, TypeInfo } from '../../types/type';

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

interface PokemonsState {
  pokemonsList: Pokemon[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalCount: number;
  searchQuery: string;
  selectedTypes: string[];
  favorites: Pokemon[];
}

const initialState: PokemonsState = {
  pokemonsList: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
  searchQuery: '',
  selectedTypes: [],
  favorites: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
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
        (
          state,
          action: PayloadAction<{ pokemons: Pokemon[]; count: number }>
        ) => {
          state.loading = false;
          state.pokemonsList = [
            ...state.pokemonsList,
            ...action.payload.pokemons,
          ];
          state.totalCount = action.payload.count;
        }
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  setCurrentPage,
  addFavorite,
  removeFavorites,
  setSearchQuery,
  setSelectedTypes,
  resetPokemonState,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
