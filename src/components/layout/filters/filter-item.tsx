import { memo } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import cn from 'classnames';

import { useAppDispatch } from '@/store/hooks';
import { setFilter } from '@/store/global-slice';
import { FilterTypes } from '@/types';

interface FilterItemProps {
  type: FilterTypes;
  label: string;
  isActive: boolean;
}

export function FilterItem({ type, label, isActive }: FilterItemProps) {
  const dispatch = useAppDispatch();

  const onFilterChange = () => {
    dispatch(setFilter(type));
  };

  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: onFilterChange,
  });

  return (
    <div
      ref={ref}
      className={cn('py-2 px-4 rounded cursor-pointer', {
        'bg-lime-600': isActive && !focused,
        'bg-indigo-800': focused,
      })}
      onClick={() => {
        focusSelf();
        onFilterChange();
      }}
    >
      {label}
    </div>
  );
}

export default memo(FilterItem);
