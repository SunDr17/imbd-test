import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMoviesAction } from '@/store/global-slice';
import {
  isLoading as isLoadingSelector,
  selectMovies,
  selectMoviesFilter,
} from '@/store/selectors';

export const useHomePage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(isLoadingSelector);
  const movies = useAppSelector(selectMovies);
  const filter = useAppSelector(selectMoviesFilter);

  useEffect(() => {
    dispatch(fetchMoviesAction());
  }, [filter]);

  return {
    isLoading,
    movies,
  };
};
