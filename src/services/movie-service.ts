import { FilterTypes, MovieInterface } from '@/types';
import { apiClient } from './api';

export default class MovieService {
  public static async getMovie(id: number): Promise<MovieInterface> {
    const { data } = await apiClient.get(`/movie/${id}`);

    return data;
  }

  public static async getMovies(filter: FilterTypes): Promise<MovieInterface[]> {
    if (filter === 'popular') {
      return MovieService.getPopularMovies();
    }

    if (filter === 'now') {
      return MovieService.getNowPlayingMovies();
    }

    if (filter === 'favorites') {
      return MovieService.getFavorites();
    }

    return [];
  }

  public static getFavorites(): MovieInterface[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  public static addFavorite(movie: MovieInterface): void {
    const favorites = MovieService.getFavorites();
    // Check if the movie already exists
    const alreadyExists = favorites.some((fav) => fav.id === movie.id);

    if (!alreadyExists) {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  }

  public static removeFavorite(movieId: number): void {
    const favorites = MovieService.getFavorites();
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  private static async getPopularMovies(): Promise<MovieInterface[]> {
    const { data } = await apiClient.get('/movie/popular');

    return data.results;
  }

  private static async getNowPlayingMovies(): Promise<MovieInterface[]> {
    const { data } = await apiClient.get('/movie/now_playing');

    return data.results;
  }
}
