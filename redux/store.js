import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadPersistedState } from './features/authSlice';
import postsReducer from './features/postsSlice';
import eventsReducer from './features/eventSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // The reducer is named 'auth'
    posts: postsReducer,
    events: eventsReducer,
  },
  preloadedState: {
    auth: loadPersistedState(), // Nest the persisted state under 'auth'
    posts: {
      posts: [],
      currentPost: null,
      loading: false,
      error: null
    },
    events: {
      events: [],
      currentEvent: null,
      loading: false,
      error: null
    },
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;