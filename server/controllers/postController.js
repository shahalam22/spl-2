import * as postService from "../services/postService.js";
import catchAsync from "../utils/catchAsync.js";

export const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost({ ...req.body, user_id: req.user.user_id });
  res.status(201).json({ success: true, data: post });
});

export const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  res.status(200).json({ success: true, data: post });
});

export const getAllPosts = catchAsync(async (req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json({ success: true, data: posts });
});

export const updatePost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.id);

  // Check if the logged-in user is the creator of the post
  if (!post || post.user_id !== req.user.user_id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this post",
    });
  }

  const updatedPost = await postService.updatePost(req.params.id, req.body);
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
