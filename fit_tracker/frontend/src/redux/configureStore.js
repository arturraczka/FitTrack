import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';

const configureStore = () => {
  return configureStore({
    reducer: {
      workouts: workoutReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
};

export default configureStore;