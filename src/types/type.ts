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
  searchQuery: string;
  selectedTypes: string[];
  favorites: Pokemon[];
  types: string[];
}
