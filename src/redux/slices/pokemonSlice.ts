import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchPokemons,
  getAllTypes,
  fetchPokemonsByType,
} from '../../services/api';
import { Pokemon, PokemonsState } from '../../types/type';

const initialState: PokemonsState = {
  pokemonsList: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
  searchQuery: '',
  selectedTypes: [],
  favorites: [],
  types: [],
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
      })

      .addCase(fetchPokemonsByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemonsByType.fulfilled,
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
      .addCase(fetchPokemonsByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      .addCase(
        getAllTypes.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.types = action.payload;
        }
      );
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
