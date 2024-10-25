export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

export interface TypeInfo {
  type: {
    name: string;
  };
}

export interface AbilitiesInfo {
  ability: {
    name: string;
  };
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonsState {
  pokemonsList: Pokemon[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalCount: number;
  favorites: Pokemon[];
  types: string[];
}

export interface FetchPokemonsResponse {
  pokemons: Pokemon[];
  count: number;
}

export type PokemonDetails = {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  image: string;
};
