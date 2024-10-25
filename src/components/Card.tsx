import { memo } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Pokemon } from '../types/type';
import { AppDispatch, RootState } from '../redux/store';
import HeartIcon from './ui/HeartIcon';
import { addFavorite } from '../redux/slices/pokemonSlice';

const Card: React.FC<Pokemon> = memo(({ id, name, image, type }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.pokemons);

  const isSelected = favorites.some((favorite) => favorite.id === id);
  console.log(isSelected);

  const handleClick = (): void => {
    navigate(`/pokemon/${id}`);
  };

  const handleSelectCard = (pokemon: Pokemon) => {
    dispatch(addFavorite(pokemon));
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative my-4 cursor-pointer overflow-hidden rounded-lg shadow-md transition duration-150 ease-in-out `}
    >
      <div className="relative h-40 overflow-hidden rounded-md">
        <div className="absolute bottom-0 right-0 bg-amber-300 py-2 px-4 rounded-md z-10">
          <p className="text-gray-700 font-bold">{id}</p>
        </div>
        <img
          className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-110"
          src={image}
          alt={name}
        />
        <span
          className="absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation();
            handleSelectCard({ id, name, image, type });
          }}
        >
          <HeartIcon isSelected={isSelected} />
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-700">Type: {type}</p>
      </div>
    </div>
  );
});

export default Card;
