import { FocusableComponentLayout } from '@noriginmedia/norigin-spatial-navigation';

export const onElementFocused = (element: FocusableComponentLayout) => {
  // for old devices needed to replace it with scrollTop
  element.node.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });
};
