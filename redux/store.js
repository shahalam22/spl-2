// import { configureStore } from '@reduxjs/toolkit';
// import authReducer, {persistedState} from './features/authSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   preloadedState: persistedState(),
//   devTools: process.env.NODE_ENV !== 'production',
// });









import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadPersistedState } from './features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // The reducer is named 'auth'
  },
  preloadedState: {
    auth: loadPersistedState(), // Nest the persisted state under 'auth'
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// // Optional: Log state changes for debugging (remove in production)
// if (process.env.NODE_ENV !== 'production') {
//   store.subscribe(() => {
//     console.log('Current Redux State:', store.getState());
//   });
// }

// Export for use in components and middleware
export default store;