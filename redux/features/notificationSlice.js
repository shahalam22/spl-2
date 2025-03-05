// // notificationSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Base URL for API (adjust according to your backend setup)
// const API_URL = '/api/notifications';

// // Async thunk to fetch notifications
// export const fetchNotifications = createAsyncThunk(
//   'notifications/fetchNotifications',
//   async (_, { rejectWithValue }) => {
//     try {

//         console.log(auth.user.token);
        

//       const response = await fetch(`http://localhost:5000/api/notifications/`, {
//         method: 'GET',
//         headers: {
//         //   'Content-Type': 'application/json',
//           Authorization: `Bearer ${auth.user.token}`, // Assuming token-based auth
//         }
//       });

//       console.log(response.data.data);
      
//       if(!response.ok) throw new Error('Failed to fetch notifications', auth.user.token);
//       return response.data.data; // Assuming the API returns { success: true, data: notifications }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
//     }
//   }
// );

// // Async thunk to delete a notification
// export const deleteNotification = createAsyncThunk(
//   'notifications/deleteNotification',
//   async (notificationId, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${notificationId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       return notificationId; // Return the ID of the deleted notification
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to delete notification');
//     }
//   }
// );

// // Create the notification slice
// const notificationSlice = createSlice({
//   name: 'notifications',
//   initialState: {
//     notifications: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Optional: Add a reducer to clear notifications if needed
//     clearNotifications: (state) => {
//       state.notifications = [];
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Fetch notifications
//     builder
//       .addCase(fetchNotifications.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNotifications.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notifications = action.payload;
//       })
//       .addCase(fetchNotifications.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Delete notification
//       .addCase(deleteNotification.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteNotification.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notifications = state.notifications.filter(
//           (notification) => notification.notification_id !== action.payload
//         );
//       })
//       .addCase(deleteNotification.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export actions
// export const { clearNotifications } = notificationSlice.actions;

// // Export reducer
// export default notificationSlice.reducer;
















import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useState } from 'react';

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            console.log(auth.user.token);
            const response = await fetch(`http://localhost:5000/api/notifications/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.user.token}`, // Assuming token-based auth
                }
            });

            if (!response.ok) throw new Error('Failed to fetch notifications', auth.user.token);
            const data = await response.json();

            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
        }
    }
);


export const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async (notificationId, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete notification');
            return notificationId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete notification');
        }
    }
)

export const updateMarkAsRead = createAsyncThunk(
    'notifications/updateMarkAsRead',
    async (notificationId, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to mark notification as read');
            return notificationId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read');
        }
    }
)


const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNotification.fulfilled, (state, action) =>{
                state.loading = false;
                state.notifications = state.notifications.filter(
                    (notification) => notification.notification_id !== action.payload
                );
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateMarkAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMarkAsRead.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = state.notifications.map((notification) =>
                    notification.notification_id === action.payload
                        ? { ...notification, isRead: true }
                        : notification
                );
            })
            .addCase(updateMarkAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            ;
    },
});


export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;