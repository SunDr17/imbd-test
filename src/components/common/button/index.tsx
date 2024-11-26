import { useCallback, PropsWithChildren, FC, memo } from 'react';
import cn from 'classnames';
import { FocusableComponentLayout, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

interface Props {
  className?: string;
  focusKey?: string;
  onEnterPress: (value?: any) => void;
  onArrowPress?: (direction: string) => boolean;
  onFocus?: (card: FocusableComponentLayout, props: any) => void;
}

export const Button: FC<PropsWithChildren<Props>> = memo(
  ({
     className = 'btn btn-blue',
     focusKey,
     children,
     onEnterPress,
     onArrowPress,
     onFocus,
   }) => {
    const { ref, focused, focusSelf } = useFocusable({
      focusKey,
      onEnterPress: () => onEnterPress(focusKey),
      onArrowPress,
      onFocus,
    });

    const onClickHandler = useCallback(() => {
      focusSelf();
      onEnterPress(focusKey);
    }, [focusKey, focusSelf, onEnterPress]);

    const buttonClassNames = cn([
      'my-4 mx-4 py-2 px-4 inline-block cursor-pointer rounded bg-cyan-400',
      {
        'bg-indigo-800 text-white': focused,
        [className]: className,
      },
    ]);

    return (
      <button ref={ref} className={buttonClassNames} onClick={onClickHandler}>
        {children}
      </button>
    );
  }
);
