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
  const post = await postService.updatePost(req.params.id, req.body);
  res.status(200).json({ success: true, data: post });
});

export const deletePost = catchAsync(async (req, res) => {
  await postService.deletePost(req.params.id);
  res.status(204).json({ success: true });
});
