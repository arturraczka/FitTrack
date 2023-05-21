import { createSlice } from '@reduxjs/toolkit';
import { fetchActivity, postActivity } from '../actions/workoutActions';

const initialState = {
  formData: [],
  isLoading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        if (action.type === fetchActivity.fulfilled.type) {
          state.isLoading = false;
          state.formData = action.payload;
        }
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        if (action.type === fetchActivity.rejected.type) {
          state.isLoading = false;
          state.error = action.error.message;
        }
      })
      .addCase(postActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postActivity.fulfilled, (state, action) => {
        if (action.type === postActivity.fulfilled.type) {
          state.isLoading = false;
          state.formData.push(action.payload);
        }
      })
      .addCase(postActivity.rejected, (state, action) => {
        if (action.type === postActivity.rejected.type) {
          state.isLoading = false;
          state.error = action.error.message;
        }
      });
  },
});

export default workoutSlice.reducer;