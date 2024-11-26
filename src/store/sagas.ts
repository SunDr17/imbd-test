import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import MovieService from '@/services/movie-service';
import {
  fetchMoviesAction,
  fetchMoviesSuccessAction,
  fetchMovieAction,
  fetchMovieSuccessAction,
  setLoading,
} from './global-slice';
import { selectMoviesFilter } from '@/store/selectors';
import { MovieInterface } from '@/types';

function* fetchMovies() {
  const filter: ReturnType<typeof selectMoviesFilter> = yield select(selectMoviesFilter);

  try {
    yield put(setLoading(true));
    const response: Awaited<ReturnType<typeof MovieService.getMovies>> =
      yield call(MovieService.getMovies, filter);
    yield put(fetchMoviesSuccessAction(response));
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    yield put(setLoading(false));
  }
}

function* fetchMovie({ payload: movieId }: PayloadAction<MovieInterface['id']>) {
  try {
    const movie: Awaited<ReturnType<typeof MovieService.getMovie>>
      = yield call(MovieService.getMovie, movieId);

    yield put(fetchMovieSuccessAction(movie));
  } catch (error) {
    console.error('Error fetching movie:', error);
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchMoviesAction.type, fetchMovies);
  yield takeLatest(fetchMovieAction.type, fetchMovie);
}
