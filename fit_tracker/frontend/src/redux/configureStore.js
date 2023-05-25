import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './reducers/workoutSlice';

const store = configureStore({ reducer: workoutReducer });

export default store;