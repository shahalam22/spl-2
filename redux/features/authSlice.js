import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API calls (replace with your real API logic from server/)
export const loginUser = createAsyncThunk(
  'login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();

      // console.log(data);

      return data; // { user, token }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'register',
  async ({ username, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data; // { user, token }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Default initial state (will be overridden by persisted state if available)
    // token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // Clear user data
      // state.token = null; // Clear token
      state.error = null; // Clear any errors
      // Clear persisted data in localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        // localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.data.email; // Assuming email is the user identifier
        state.user = action.payload.data; // Assuming email is the user identifier
        // console.log(action.payload.data);
        // state.token = action.payload.data.token;
        // Persist to localStorage for refresh persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
          // localStorage.setItem('token', state.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.data.email; // Assuming email is the user identifier
        state.user = action.payload.data; // Assuming email is the user identifier
        // state.token = action.payload.data.token;
        // Persist to localStorage for refresh persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
          // localStorage.setItem('token', state.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Function to load persisted state from localStorage
export const loadPersistedState = () => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      // token: null,
      loading: false,
      error: null,
    };
  }

  return {
    user: JSON.parse(localStorage.getItem('user')) || null,
    // token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  };
};

export const { logout } = authSlice.actions;
export default authSlice.reducer;