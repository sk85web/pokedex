import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Header = () => {
  const { favorites } = useSelector((state: RootState) => state.pokemons);

  return (
    <div className="h-24 bg-gray-700 text-white flex justify-between items-center py-2 px-4">
      <Logo />
      <div className="flex text-xl items-center font-bold gap-6">
        <Link className="hover:text-amber-300 hover:underline" to="/">
          Home
        </Link>
        <Link
          className="hover:text-amber-300 hover:underline relative"
          to="/favorites"
        >
          Favorites
          {favorites.length !== 0 && (
            <span className="absolute right-[-10px] bottom-[10px] test-[13px] text-amber-300">
              {favorites.length}
            </span>
          )}
        </Link>
        <Link className="hover:text-amber-300 hover:underline" to="/aboutUs">
          About me
        </Link>
      </div>
    </div>
  );
};

export default Header;
