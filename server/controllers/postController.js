import * as postService from "../services/postService.js";
import catchAsync from "../utils/catchAsync.js";



export const createPost = catchAsync(async (req, res) => {
  const { location, pickup, ...rest } = req.body;

  // Convert and parse fields to match Prisma schema
  const postData = {
    ...rest,
    user_id: parseInt(req.user.user_id, 10), // Ensure user_id is an integer
    category_id: parseInt(rest.category_id, 10), // Convert string to integer
    price: parseFloat(rest.price) || 0, // Convert string to float
    bidAmount: parseFloat(rest.bidAmount) || parseFloat(rest.price) || 0, // Convert string to float
    quantity: parseInt(rest.quantity, 10) || 0, // Convert string to integer
    isRequest: rest.isRequest === "true" || rest.isRequest === true, // Convert string to boolean
    status: rest.status || "available", // Default if not provided
    images: req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [], // File paths
    location: location ? JSON.parse(location) : {}, // Parse JSON string to object
    pickup: pickup ? JSON.parse(pickup) : {}, // Parse JSON string to object
    event_id: rest.event_id ? parseInt(rest.event_id, 10) : null, // Optional integer or null
  };

  // console.log("Parsed Post Data for Prisma:", postData);
  // console.log("log from postController.js", postData);
  

  const post = await postService.createPost(postData);
  res.status(201).json({ success: true, data: post });
});

export const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  res.status(200).json({ success: true, data: post });
});

export const getAllPosts = catchAsync(async (req, res) => {
  const posts = await postService.getAllPosts();

  // console.log("log from postController.js", posts);
  

  res.status(200).json({ success: true, data: posts });
});

export const updatePost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.id);

  // Check if the logged-in user is the creator of the post
  // if (!post || post.user_id !== req.user.user_id) {
  //   return res.status(403).json({
  //     success: false,
  //     message: "You are not authorized to update this post",
  //   });
  // }

  // Updating bid amount to fload because it was string
  const bidAmount = parseFloat(req.body.bidAmount) || 0;
  const postData = { ...req.body, bidAmount:bidAmount};


  const updatedPost = await postService.updatePost(req.params.id, postData);
  res.status(200).json({ success: true, message: "Post updated successfully", data: updatedPost });
});

export const deletePost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.id); // Fetch the post by ID

  // Check if the logged-in user is the creator of the post
  if (!post || post.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this post",
    });
  }

  // Perform the delete operation
  await postService.deletePost(req.params.id);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});
