import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { Pokemon } from '../types/type';
import Card from './Card';

interface CardsListProps {
  pokemons: Pokemon[];
}

const CardsList: React.FC<CardsListProps> = ({ pokemons }) => {
  const { loading } = useSelector((state: RootState) => state.pokemons);

  if (!loading && pokemons.length === 0) {
    return <p className="text-red-500">No Pokémon found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

export default CardsList;
