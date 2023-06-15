import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await fetch('http://127.0.0.1:8000/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
});

const logout = createAsyncThunk('auth/logout', async (token) => {
  const response = await fetch('http://127.0.0.1:8000/api/logout/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

const register = createAsyncThunk('auth/register', async ({ email, username, password }) => {
  const response = await fetch('http://127.0.0.1:8000/api/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });
  const data = await response.json();
  return data;
});

const fetchUser = createAsyncThunk('auth/fetchUser', async (token) => {
  const response = await fetch('http://127.0.0.1:8000/api/user/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    error: null,
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuthState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.token = null;
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
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.token = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
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
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCurrentUser = createSelector(
  (state) => state.auth.user,
  (user) => user
);

export { login, logout, register, fetchUser };
export const { setToken, setUser, clearAuthState } = authSlice.actions;

export default authSlice.reducer;