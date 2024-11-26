import { createSelector } from '@reduxjs/toolkit';

import { MovieInterface } from '@/types';
import { RootState } from '.';

const global = (state: RootState) => state.global;

export const isLoading = createSelector(global, (state) => state.loading);

export const selectMovies = createSelector(global, (state) => state.movies);
export const selectMoviesFilter = createSelector(global, (state) => state.filter);

export const selectMovie = createSelector(global, (state) => state.movie);

export const selectFavorites = createSelector(global, (state) => state.favorites);

export const isMovieFavorite = (movieId: MovieInterface['id']) =>
  createSelector(selectFavorites, (favorites) =>
    favorites.some((movie) => movie.id == movieId)
  );
