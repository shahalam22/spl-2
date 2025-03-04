import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for CRUD operations
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();

      return data.data; // Assuming { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      return data.data; // { success: true, data: {...} }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      // console.log("Auth Token:", auth.user.token); // Check token
      // console.log("Post Data:", postData); // Check data before FormData

      const formData = new FormData();
      for (const key in postData) {
        if (key === "images") {
          // console.log("Images:", postData.images); // Check images array
          postData.images.forEach((file) => formData.append("images", file));
        } else if (typeof postData[key] === "object") {
          formData.append(key, JSON.stringify(postData[key]));
        } else {
          formData.append(key, postData[key]);
        }
      }

      const response = await fetch("http://localhost:5000/api/posts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: formData,
      });

      const responseText = await response.text(); // Get raw response
      // console.log("Response Status:", response.status);
      // console.log("Response Text:", responseText);

      if (!response.ok) throw new Error(`Failed to create post: ${response.status} - ${responseText}`);
      const data = JSON.parse(responseText);

      // console.log("Parsed Data:", data);

      return data.data;
    } catch (error) {
      console.error("Create Post Error:", error);
      return rejectWithValue(error.message);
    }
  }
);


export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ postId, postData }, { getState, rejectWithValue }) => {

    // console.log("Post ID:", postId, "Post Data:", postData);

    try {
      const { auth } = getState();
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('Failed to update post');
      const data = await response.json();
      return data.data; // { success: true, data: {...} }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete post');
      return postId; // Return the ID for removal from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [], // Array of all posts (resources and requests)
    currentPost: null, // For viewing/editing a single post
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Posts
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex((post) => post.post_id === action.payload.post_id);
        if (index !== -1) state.posts[index] = action.payload;
        if (state.currentPost?.post_id === action.payload.post_id) state.currentPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.post_id !== action.payload);
        if (state.currentPost?.post_id === action.payload) state.currentPost = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;