import { NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getNavigationClass } from '../../utils/navigationClass';

const Header = () => {
  const { favorites } = useSelector((state: RootState) => state.pokemons);

  return (
    <div className="h-24 bg-gray-700 text-white flex justify-between items-center py-2 px-4">
      <Logo />
      <div className="flex text-xl items-center font-bold gap-6">
        <NavLink
          className={({ isActive }) => getNavigationClass(isActive)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => getNavigationClass(isActive)}
          to="/favorites"
        >
          Favorites
          {favorites.length !== 0 && (
            <span className="absolute right-[-10px] bottom-[10px] test-[13px] text-amber-300">
              {favorites.length}
            </span>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) => getNavigationClass(isActive)}
          to="/aboutme"
        >
          About me
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
