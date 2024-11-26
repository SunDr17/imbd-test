import { useEffect } from 'react';

import {
  KeyHandler,
  remoteControllerManager,
} from '@/services/remote-controller-manager';

export interface UseRemoteControllerConfig {
  listenTo: {
    [key: string]: KeyHandler;
  };
}

export default function useRemoteController({ listenTo }: UseRemoteControllerConfig): void {
  useEffect(() => {
    Object.entries(listenTo).forEach(([key, value]) => {
      remoteControllerManager.addListener(key, value);
    });

    return () => {
      Object.entries(listenTo).forEach(([key, value]) => {
        remoteControllerManager.removeListener(key, value);
      });
    };
  }, [listenTo]);
}
