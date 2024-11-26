import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { init } from '@noriginmedia/norigin-spatial-navigation';

import { store } from '@/store';
import { router } from '@/router';
import { keycodes } from '@/utils/keycodes';
import { remoteControllerManager } from '@/services/remote-controller-manager';

import './index.css';

init();

remoteControllerManager.init();
remoteControllerManager.setKeyMap({
  up: [keycodes.KEY_UP],
  down: [keycodes.KEY_DOWN],
  left: [keycodes.KEY_LEFT],
  right: [keycodes.KEY_RIGHT],
  ok: [keycodes.KEY_OK],
  back: [keycodes.KEY_BACK],
});

const Index = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
};


const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<Index />);
