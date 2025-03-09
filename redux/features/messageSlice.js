import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all chat users (people the logged-in user has interacted with)
export const fetchChatUsers = createAsyncThunk(
  "messages/fetchChatUsers",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`http://localhost:5000/api/messages/chat-users/${userId}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      const data = await response.json();

      if (!data.success) throw new Error(data.message);
      return data.data; // List of users { user_id, username }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all messages between logged-in user and another user
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ userId, anotherUserId }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`http://localhost:5000/api/messages/${userId}/${anotherUserId}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      const data = await response.json();

      if (!data.success) throw new Error(data.message);
    //   console.log("Parsed Data:", data);
      
      return data.data; // List of messages
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    chatUsers: [],  // List of chat users
    messages: [],   // List of messages between selected users
    selectedUser: null, // Stores selected user in conversation
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = []; // Reset messages when switching conversations
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Optimistically update messages
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Chat Users
      .addCase(fetchChatUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chatUsers = action.payload;
      })
      .addCase(fetchChatUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedUser, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
