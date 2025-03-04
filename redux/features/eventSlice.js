import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async thunks for CRUD operations
// export const fetchAllEvents = createAsyncThunk(
//   'events/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/events', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (!response.ok) throw new Error('Failed to fetch events');
//       const data = await response.json();

//       return data.data; // Assuming { success: true, data: [...] }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (userId, { rejectWithValue }) => { // Accept userId as a parameter
    try {
      // Add userId as a query parameter in the URL
      const response = await fetch(`http://localhost:5000/api/events?userId=${userId}`, {
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

      const formData = new FormData();
      for (const key in eventData) {
        if (key === 'images') {
          eventData.images.forEach((file) => formData.append('image', file)); // Use 'image' to match backend multer field
        } else if (key === 'location') {
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
      if (!response.ok) throw new Error(`Failed to create event: ${response.status} - ${responseText}`);
      const data = JSON.parse(responseText);

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

export const unregisterFromEvent = createAsyncThunk(
  'events/unregister',
  async (eventId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`http://localhost:5000/api/events/unregister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify({ eventId }),
      });
      if (!response.ok) throw new Error('Failed to unregister from event');
      return eventId; // Return the ID for removal from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const fetchAllOfCurrentEvent = createAsyncThunk(
  'events/fetchParticipants',
  async (eventId, { rejectWithValue }) => {
    console.log('from eventSlice.js function fetchParticipants of', eventId);
    
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch participants');
      const data = await response.json();
      console.log('from eventSlice.js function fetchParticipants of', data);
      
      return { event: data.data.event, participantsData: data.data.participantsData, productsData: data.data.productsData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)


// export const fetchProductsOfEvent = createAsyncThunk(
//   'events/fetchProducts',
//   async (eventId, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/events/${eventId}/products`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (!response.ok) throw new Error('Failed to fetch products');
//       const data = await response.json();
//       return data.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// )


// Async thunk for registering to an event
export const registerForEvent = createAsyncThunk(
  "events/register",
  async (eventId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      // console.log('from eventSlice.js', eventId);
      
      const response = await fetch("http://localhost:5000/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify({ eventId }),
      });

      // console.log('from eventSlice.js', response);
      

      if (!response.ok) throw new Error("Failed to register for event ", response.text);
      const data = await response.json();
      return { eventId, participant: data.data }; // Return the event ID and the new participant
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    currentEvent: null,
    currentEventParticipants: [],
    currentEventProducts: [],
    participatedEvents: [], // Array to store events the user has participated in
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
        state.events = action.payload.events;
        state.participatedEvents = action.payload.participatedEvents;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Event by ID
      // .addCase(fetchEventById.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchEventById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.currentEvent = action.payload;
      // })
      // .addCase(fetchEventById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
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
      })
      
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        const { eventId, participant } = action.payload;

        // Option 1: Add participant data to participatedEvents
        // state.participatedEvents.push({ eventId, ...participant });

        // Option 2: Add the full event data to participatedEvents
        const event = state.events.find((event) => event.event_id === eventId);
        state.participatedEvents.push({ ...event, participant });
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unregisterFromEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unregisterFromEvent.fulfilled, (state, action) => {
        state.loading = false;
        const eventId = action.payload;
        state.participatedEvents = state.participatedEvents.filter((event) => event.event_id !== eventId);
      })
      .addCase(unregisterFromEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOfCurrentEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOfCurrentEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload.event;
        state.currentEventParticipants = action.payload.participantsData;
        state.currentEventProducts = action.payload.productsData;
      })
      .addCase(fetchAllOfCurrentEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchParticipatedEvents.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchParticipatedEvents.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.participatedEvents = action.payload; // Store the events directly
      // })
      // .addCase(fetchParticipatedEvents.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
      ;
      // .addCase(fetchEventParticipants.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchEventParticipants.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.participants[action.payload.eventId] = action.payload.participants;
      // })
      // .addCase(fetchEventParticipants.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });;
  },
});

export const { clearCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;