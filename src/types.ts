export interface GenreInterface {
  id: number;
  name: string;
}

export interface MovieInterface {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: GenreInterface[];
  release_date: string;
  vote_average: number;
}

export type FilterTypes = 'popular' | 'now' | 'favorites';
