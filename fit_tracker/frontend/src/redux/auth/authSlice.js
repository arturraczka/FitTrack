import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000/api';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/user/token/`, credentials);
  console.log(response.data)
  return response.data;
});

export const register = createAsyncThunk('auth/register', async ({ email, username, password }) => {
  const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });
  const data = await response.json();
  return data;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await axios.get(`${API_URL}/user/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  });
  console.log(response.data)
  return response.data;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await axios.post(`${API_URL}/user/token/refresh/`, {
    refresh: Cookies.get('refresh_token'),
  });
  console.log(response.data)
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    access_token: Cookies.get('access_token'),
    refresh_token: Cookies.get('refresh_token'),
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.access_token = action.payload.access;
        state.refresh_token = action.payload.refresh;
        Cookies.set('access_token', action.payload.access, { expires: 1 / 48 }); // 5 minutes
        Cookies.set('refresh_token', action.payload.refresh, { expires: 1 }); // 24 hours
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, async (state, action) => {
        if (action.error.message === 'Request failed with status code 401') {
          try {
            await refreshToken();
            const response = await axios.get(`${API_URL}/user/`, {
              headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
              },
            });
            state.user = response.data;
          } catch (error) {
            state.status = 'failed';
            state.error = error.message;
          }
        } else {
          state.status = 'failed';
          state.error = action.error.message;
        }
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.access_token = action.payload.access;
        Cookies.set('access_token', action.payload.access, { expires: 1 / 48 }); // 5 minutes
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state) => state.auth && state.auth.user;
export const selectToken = (state) => state.auth && state.auth.access_token;
export const selectStatus = (state) => state.auth && state.auth.status;
export const selectError = (state) => state.auth && state.auth.error;

export default authSlice.reducer;