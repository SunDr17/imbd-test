type KeyMap = {
  [key: string]: number[];
};

export type KeyHandler = () => void;

type KeyHandlersMap = {
  [key: string]: KeyHandler[];
};

type InitConfig = {
  debug?: boolean;
  throttle?: number;
};

class RemoteControllerManager {
  private debug: boolean = false;

  private paused: boolean = false;

  private keyMap: KeyMap = {};

  private keyHandlersMap: KeyHandlersMap = {};

  private keyDownEventListener?: (event: KeyboardEvent) => void;

  init({ debug = false }: InitConfig = {}) {
    this.debug = debug;

    this.bindEventHandler();
  }

  public destroy(): void {
    this.unbindEventHandler();
  }

  private bindEventHandler(): void {
    if (typeof window !== 'undefined' && window.addEventListener) {
      this.keyDownEventListener = (event: KeyboardEvent): void => {
        if (this.paused) {
          return;
        }

        this.log('keyDownHandler', `key ${event.keyCode} pressed`);

        const buttonName = this.getButtonNameFromKeyCode(event.keyCode);

        if (!buttonName) {
          this.log('keyDownHandler', 'button not mapped');

          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.keyHandlersMap[buttonName].length > 0) {
          this.log('keyDownHandler', `exec action for button ${buttonName}`);
          this.keyHandlersMap[buttonName].forEach((callback) => callback());
        } else {
          this.log('keyDownHandler', `no actions for button ${buttonName}`);
        }
      };

      window.addEventListener('keydown', this.keyDownEventListener);
    }
  }

  private unbindEventHandler(): void {
    if (typeof window !== 'undefined' && window.removeEventListener) {
      if (this.keyDownEventListener) {
        window.removeEventListener('keydown', this.keyDownEventListener);

        this.keyDownEventListener = undefined;
      }
    }
  }

  public setKeyMap(keyMap: { [key: string]: number | number[] }): void {
    Object.entries(keyMap).forEach(([key, value]) => {
      if (typeof value === 'number') {
        this.keyMap[key] = [value];
      } else if (Array.isArray(value)) {
        this.keyMap[key] = value;
      }
    });

    this.log('setKeyMap', 'keyMap:', this.keyMap);

    Object.keys(this.keyMap).forEach((key) => {
      if (!this.keyHandlersMap[key]) {
        this.keyHandlersMap[key] = [];
      }
    });

    this.log('setKeyMap', 'keyHandlersMap:', this.keyHandlersMap);
  }

  private getButtonNameFromKeyCode(keyCode: number): string | undefined {
    return Object.keys(this.keyMap).find((key) => this.keyMap[key].includes(keyCode));
  }

  public pauseListeners(): void {
    this.paused = true;
  }

  public resumeListeners(): void {
    this.paused = false;
  }

  public addListener(key: string, callback: KeyHandler): void {
    if (this.keyHandlersMap[key]) {
      this.keyHandlersMap[key].push(callback);

      this.log('addListener', `keyHandlersMap for ${key}:`, this.keyHandlersMap[key]);
    }
  }

  public removeListener(key: string, callback: KeyHandler): void {
    if (this.keyHandlersMap[key]) {
      this.keyHandlersMap[key] = this.keyHandlersMap[key].filter((handler) => handler !== callback);

      this.log('removeListener', `keyHandlersMap for ${key}:`, this.keyHandlersMap[key]);
    }
  }

  private log(functionName: string, debugString: string, ...rest: any[]): void {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(
        `%c${functionName}%c${debugString}`,
        'background: #0FF; color: black; padding: 1px 5px;',
        'background: #333; color: #BADA55; padding: 1px 5px;',
        ...rest,
      );
    }
  }
}

export const remoteControllerManager = new RemoteControllerManager();
