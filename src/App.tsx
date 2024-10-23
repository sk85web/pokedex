import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutPage from './layout/LayoutPage';
import Home from './routes/Home';
// import AboutUs from './routes/AboutUs';
// import PokemmDetails from './routes/PokemonDetails';
// import NotFoundPage from './routes/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          // {
          //   path: '/pokemon/:id',
          //   element: <PokemmDetails />,
          // },
        ],
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
