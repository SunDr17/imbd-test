import { useCallback, useMemo, FC } from 'react';
import cn from 'classnames';
import {
  useFocusable,
  FocusableComponentLayout,
} from '@noriginmedia/norigin-spatial-navigation';

interface Props {
  id: number;
  title: string;
  posterUrl: string;
  isFavorite?: boolean;
  onFocus: (card: FocusableComponentLayout, props: any) => void;
  onEnterPress: (props: GridItemPressEvent) => void;
  onBlur?: (card: FocusableComponentLayout, props: any) => void;
}

type GridItemPressEvent = {
  id: string;
};

export const GridItem: FC<Props> = ({
  id,
  title,
  posterUrl,
  isFavorite = false,
  onFocus,
  onBlur,
  onEnterPress,
}) => {
  const extraProps = useMemo(
    () =>
      ({
        id,
      } as unknown as GridItemPressEvent),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  const { ref, focused, focusSelf } = useFocusable<GridItemPressEvent>({
    focusKey: `GridItem/#/${id}`,
    onFocus,
    onBlur,
    onEnterPress,
    extraProps,
  });

  const onClickHandler = useCallback(() => {
    focusSelf();
    onEnterPress(extraProps);
  }, [extraProps, focusSelf, onEnterPress]);

  const cardClasses = cn([
    'border relative rounded-md overflow-hidden shadow-md duration-100 hover:-translate-y-1 cursor-pointer',
    {
      '-translate-y-1 border-indigo-800': focused,
    },
  ]);

  return (
    <div ref={ref} className={cardClasses} onClick={onClickHandler}>
      {isFavorite ? (
        <div
          className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
        >
          You like it
        </div>
      ) : null}

      <img src={posterUrl} alt={title} className="w-full min-h-72 object-cover"/>

      <div className={cn('p-3 font-bold', { 'text-sky-500': focused })}>
        {title}
      </div>
    </div>
  );
};
