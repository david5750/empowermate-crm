
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './apis/authApi';
import { leadApi } from './apis/leadApi';
import { clientApi } from './apis/clientApi';
import { demoClientApi } from './apis/demoClientApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [demoClientApi.reducerPath]: demoClientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      leadApi.middleware,
      clientApi.middleware,
      demoClientApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
