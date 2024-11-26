import { createBrowserRouter } from 'react-router-dom';

import { HomePage, MoviePage } from '@/pages';

export const routes = {
  home: {
    path: "/",
  },
  movie: {
    path: "/movie/:id",
    link: (id: string) => `/movie/${id}`,
  },
};

export const router = createBrowserRouter([
  {
    path: routes.home.path,
    element: <HomePage />,
  },
  {
    path: routes.movie.path,
    element: <MoviePage />,
  },
]);
