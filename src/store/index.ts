import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import globalReducer from './global-slice';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware);
  },
});

sagaMiddleware.run(saga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
