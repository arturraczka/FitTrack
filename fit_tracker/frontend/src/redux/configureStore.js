import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import Cookies from 'js-cookie';
import workoutReducer from './reducers/workoutSlice';
import { refreshToken } from './auth/authSlice';

const logger = createLogger({
  collapsed: true,
});

const tokenMiddleware = (store) => (next) => (action) => {
  if (action.type === 'auth/login/fulfilled') {
    const token = action.payload.access;
    Cookies.set('access_token', token, { expires: 1 / 48 }); // 5 minutes
    Cookies.set('refresh_token', action.payload.refresh, { expires: 1 }); // 24 hours
  } else if (action.type === 'auth/logout') {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  } else if (action.type === 'auth/fetchUser/rejected' && action.error.message === 'Request failed with status code 401') {
    const state = store.getState();
    const refresh_token = Cookies.get('refresh_token');
    if (refresh_token && state.auth.status !== 'loading') {
      store.dispatch(refreshToken());
    }
  }
  return next(action);
};

const store = configureStore({
  reducer: workoutReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, tokenMiddleware),
});

export default store;