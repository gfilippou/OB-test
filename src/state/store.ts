import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sharedReducer from 'src/state/sharedSlice';
import websocketMiddleware from 'src/websockets/websocketMiddleware';

export const store = configureStore({
  reducer: {
    shared: sharedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([websocketMiddleware]);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
