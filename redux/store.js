import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadPersistedState } from './features/authSlice';
import postsReducer from './features/postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // The reducer is named 'auth'
    posts: postsReducer
  },
  preloadedState: {
    auth: loadPersistedState(), // Nest the persisted state under 'auth'
    posts: {
      posts: [],
      currentPost: null,
      loading: false,
      error: null
    }
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});


// Export for use in components and middleware
export default store;