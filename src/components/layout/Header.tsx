import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Logo from '../ui/Logo';
import { RootState } from '../../redux/store';
import { getNavigationClass } from '../../utils/navigationClass';

const Header = () => {
  const { favorites } = useSelector((state: RootState) => state.pokemons);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-24 bg-gray-700 text-white flex justify-between items-center py-2 px-4 relative">
      <Logo />
      <button
        aria-label={isMenuOpen ? 'close menu' : 'open menu'}
        onClick={toggleMenu}
        className="block md:hidden text-3xl relative z-50"
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
      >
        {isMenuOpen ? 'X' : '☰'}
      </button>
      <nav
        className={`${
          isMenuOpen
            ? 'flex absolute top-0 left-0 w-full h-[100vh] bg-gray-700 z-40 flex-col text-5xl gap-12'
            : 'hidden'
        } md:flex text-xl items-center font-bold gap-6 md:gap-6 md:static justify-center`}
      >
        <NavLink
          className={({ isActive }) => getNavigationClass(isActive)}
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${getNavigationClass(isActive)} relative`
          }
          to="/favorites"
          onClick={() => setIsMenuOpen(false)}
        >
          Favorites
          {favorites.length !== 0 && (
            <span className="absolute z-60 right-[-10px] bottom-[10px] test-[13px] text-amber-300">
              {favorites.length}
            </span>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) => getNavigationClass(isActive)}
          to="/aboutme"
          onClick={() => setIsMenuOpen(false)}
        >
          About me
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
