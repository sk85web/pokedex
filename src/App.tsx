import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutPage from './layout/LayoutPage';
import Home from './routes/Home';
import Favorites from './routes/Favorites';
// import AboutUs from './routes/AboutUs';
import PokemonDetails from './routes/PokemonDetails';
// import NotFoundPage from './routes/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/pokemon/:id',
        element: <PokemonDetails />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      // {
      //   path: '/aboutme',
      //   element: <AboutMe />,
      // },
      // {
      //   path: '*',
      //   element: <NotFoundPage />,
      // },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
