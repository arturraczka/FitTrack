import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  formData: [],
  isLoading: false,
  error: null,
};

const fetchActivity = (activityType) => {
  return createAsyncThunk(`activities/${activityType}`, async () => {
    const response = await fetch(`http://127.0.0.1:8000/my-activities/${activityType}/`);
    const data = await response.json();
    return data;
  });
};

const postActivity = (activityType) => {
  return createAsyncThunk(`activities/${activityType}`, async (formData) => {
    const response = await fetch(`http://127.0.0.1:8000/my-activities/${activityType}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  });
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity('running').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivity('running').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData = action.payload;
      })
      .addCase(fetchActivity('running').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postActivity('running').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postActivity('running').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData.push(action.payload);
      })
      .addCase(postActivity('running').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActivity('cycling').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivity('cycling').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData = action.payload;
      })
      .addCase(fetchActivity('cycling').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postActivity('cycling').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postActivity('cycling').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData.push(action.payload);
      })
      .addCase(postActivity('cycling').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActivity('walking').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivity('walking').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData = action.payload;
      })
      .addCase(fetchActivity('walking').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postActivity('walking').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postActivity('walking').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData.push(action.payload);
      })
      .addCase(postActivity('walking').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActivity('swimming').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivity('swimming').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData = action.payload;
      })
      .addCase(fetchActivity('swimming').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postActivity('swimming').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postActivity('swimming').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData.push(action.payload);
      })
      .addCase(postActivity('swimming').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActivity('hiking').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivity('hiking').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData = action.payload;
      })
      .addCase(fetchActivity('hiking').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postActivity('hiking').pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postActivity('hiking').fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData.push(action.payload);
      })
      .addCase(postActivity('hiking').rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { } = activitySlice.actions;

export const fetchRunning = fetchActivity('running');
export const postRunning = postActivity('running');
export const fetchCycling = fetchActivity('cycling');
export const postCycling = postActivity('cycling');
export const fetchWalking = fetchActivity('walking');
export const postWalking = postActivity('walking');
export const fetchSwimming = fetchActivity('swimming');
export const postSwimming = postActivity('swimming');
export const fetchHiking = fetchActivity('hiking');
export const postHiking = postActivity('hiking');

export default activitySlice.reducer;