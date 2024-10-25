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
    return <p className="text-red-500 text-4xl">No Pokémon found.</p>;
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 my-16">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

export default CardsList;
