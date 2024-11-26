import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterTypes, MovieInterface } from '@/types';
import MovieService from '@/services/movie-service';

interface MovieState {
  movies: MovieInterface[];
  movie: MovieInterface | null;
  favorites: MovieInterface[];
  filter: FilterTypes;
  loading: boolean;
}

const initialState: MovieState = {
  movies: [],
  movie: null,
  favorites: MovieService.getFavorites(),
  filter: 'popular',
  loading: false,
};

const globalSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    fetchMoviesAction(state: MovieState) {
      state.loading = true;
    },
    fetchMoviesSuccessAction(state: MovieState, action: PayloadAction<MovieInterface[]>) {
      state.movies = action.payload;
      state.loading = false;
    },
    // @ts-expect-error unused variable
    fetchMovieAction(state: MovieState, action: PayloadAction<MovieInterface['id']>) {
      state.loading = true;
    },
    fetchMovieSuccessAction(state: MovieState, action: PayloadAction<MovieInterface>) {
      state.movie = action.payload;
      state.loading = false;
    },
    addFavoriteAction(state: MovieState, action: PayloadAction<MovieInterface>) {
      MovieService.addFavorite(action.payload); // save in local storage
      state.favorites = MovieService.getFavorites();
    },
    removeFavoriteAction(state: MovieState, action: PayloadAction<MovieInterface['id']>) {
      MovieService.removeFavorite(action.payload); // remove from local storage
      state.favorites = MovieService.getFavorites();
    },
    setFilter(state: MovieState, action: PayloadAction<FilterTypes>) {
      state.filter = action.payload;
    },
    setLoading(state: MovieState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  fetchMoviesAction,
  fetchMoviesSuccessAction,
  fetchMovieAction,
  fetchMovieSuccessAction,
  addFavoriteAction,
  removeFavoriteAction,
  setFilter,
  setLoading,
} = globalSlice.actions;

export default globalSlice.reducer;
