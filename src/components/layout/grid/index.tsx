import { useCallback, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FocusContext,
  useFocusable,
  FocusableComponentLayout,
} from '@noriginmedia/norigin-spatial-navigation';

import { MovieInterface } from '@/types';
import { focusKeys } from '@/constants';
import { routes } from '@/router';
import { useAppSelector } from '@/store/hooks';
import { selectFavorites } from '@/store/selectors';
import { prepareMovieImageUrl } from '@/utils';
import { onElementFocused } from '@/services/scroll-service';
import { GridItem } from './grid-item';

type Props = {
  items: MovieInterface[];
};

export const Grid: FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return <div>Nothing to show</div>
  }

  const { ref, focusKey } = useFocusable({
    focusKey: focusKeys.Grid,
    saveLastFocusedChild: true,
    focusable: !!items.length,
  });

  const navigation = useNavigate();

  const favorites = useAppSelector(selectFavorites);

  const onCardFocusHandler = useCallback((element: FocusableComponentLayout) => {
    onElementFocused(element);
  }, []);

  const onPressMovie = useCallback(({ id }: { id: string }) => {
    navigation(routes.movie.link(id));
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((movie) => {
          const isFavorite = favorites.some((fav) => fav.id === movie.id);

          return (
            <GridItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              isFavorite={isFavorite}
              posterUrl={prepareMovieImageUrl(movie.poster_path)}
              onFocus={onCardFocusHandler}
              onEnterPress={onPressMovie}
            />
          );
        })}
      </div>
    </FocusContext.Provider>
  );
};
