import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for CRUD operations
export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();

      return data.data; // Assuming { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch event');
      const data = await response.json();
      return data.data; // { success: true, data: {...} }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      // console.log("AUTH TOKEN:", auth.user.token);
      // console.log("EVENT DATA:", eventData);

      const formData = new FormData();
      for (const key in eventData) {
        if (key === 'images') {
          // console.log('Images:', eventData.images);
          eventData.images.forEach((file) => formData.append('image', file)); // Use 'image' to match backend multer field
        } else if (key === 'location') {
          // Stringify the location object before appending
          formData.append(key, JSON.stringify(eventData[key]));
        } else {
          formData.append(key, eventData[key]);
        }
      }

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.user.token}`, // Keep the Authorization header
        },
        body: formData, // Let the browser set the Content-Type to multipart/form-data
      });

      const responseText = await response.text();
      // console.log("Response Status:", response.status);
      // console.log("Response Text:", responseText);

      if (!response.ok) throw new Error(`Failed to create event: ${response.status} - ${responseText}`);
      const data = JSON.parse(responseText);

      // console.log("Parsed Data:", data);
      return data.data; // { success: true, data: {...} }
    } catch (error) {
      console.error("ERROR:", error);
      return rejectWithValue(error.message);
    }
  }
);


export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ eventId, eventData }, { getState, rejectWithValue }) => {

    // console.log("EVENT ID:", eventId);
    // console.log("EVENT DATA:", eventData);

    // console.log("data from eventSlice.js", eventData);

    try {
      const { auth } = getState();
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Failed to update event' + response.text);
      const data = await response.json();
      return data.data; // { success: true, data: {...} }
    } catch (error) {
      // console.error("ERROR:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (eventId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete event');
      return eventId; // Return the ID for removal from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [], // Array of all events
    currentEvent: null, // For viewing/editing a single event
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Events
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex((event) => event.event_id === action.payload.event_id);
        if (index !== -1) state.events[index] = action.payload;
        if (state.currentEvent?.event_id === action.payload.event_id) state.currentEvent = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event.event_id !== action.payload);
        if (state.currentEvent?.event_id === action.payload) state.currentEvent = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;