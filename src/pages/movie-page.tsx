import { useEffect, FC } from 'react';
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';

import { useMoviePage } from '@/hooks';
import useGlobalBackListener from '@/hooks/global-back-listener';
import { Loader } from '@/components/common/loader';
import { Button } from '@/components/common/button';
import { prepareMovieImageUrl } from '@/utils';

export const MoviePage: FC = () => {
  useGlobalBackListener();

  const { isLoading, movie, navigateBack, isFavorite, handleFavoriteToggle } = useMoviePage();

  const { ref, focusKey } = useFocusable({
    preferredChildFocusKey: 'backBtn',
  });

  useEffect(() => {
    setFocus('backBtn');
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <div className="container mx-auto px-4">
          <div className="pb-4 flex flex-row items-start">
            <img
              className="w-[300px]"
              src={prepareMovieImageUrl(movie.poster_path)}
              alt={movie.title}
            />
          </div>

          <div className="pl-4">
            <h1 className="font-bold text-xl">{movie.title}</h1>

            <p className="pt-3">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="pt-3">
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
            <p className="flex flex-row gap-x-2 pt-3">
              <strong>Genres:</strong>{' '}
              {movie.genres.map((genre) => genre.name).join(', ')}
            </p>
            <p className="pt-3 text-slate-500">{movie.overview}</p>
          </div>
        </div>

        <div className="container">
          <Button focusKey="backBtn" onEnterPress={navigateBack}>
            <label>Back</label>
          </Button>

          <Button
            onEnterPress={() => {
              handleFavoriteToggle(movie);
            }}
          >
            <label>
              {isFavorite ? 'Remove From Favorites' : 'Add To Favorite'}
            </label>
          </Button>
        </div>
      </div>
    </FocusContext.Provider>
  );
};
