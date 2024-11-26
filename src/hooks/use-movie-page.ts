import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { MovieInterface } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchMovieAction,
  addFavoriteAction,
  removeFavoriteAction,
} from '@/store/global-slice';
import { isLoading as isLoadingSelector, selectMovie, isMovieFavorite } from '@/store/selectors';
import { useNavigateBack } from '@/hooks';

export const useMoviePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useAppSelector(selectMovie);
  const isFavorite = useAppSelector(isMovieFavorite(Number(id)));
  const isLoading = useAppSelector(isLoadingSelector);
  const { navigateBack } = useNavigateBack();

  const handleFavoriteToggle = (movie: MovieInterface) => {
    if (isFavorite) {
      dispatch(removeFavoriteAction(movie.id));
    } else if (movie) {
      dispatch(addFavoriteAction(movie));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieAction(Number(id)));
    }
  }, [id, dispatch]);

  return {
    isLoading,
    movie,
    navigateBack,
    isFavorite,
    handleFavoriteToggle,
  };
};
