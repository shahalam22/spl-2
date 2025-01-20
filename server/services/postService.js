import prisma from "../lib/prisma.js";

export const createPost = async (postData) => {
  return await prisma.post.create({ data: postData });
};

export const getPostById = async (postId) => {
  return await prisma.post.findUnique({ where: { post_id: postId } });
};

export const getAllPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostsByUser = async (userId) => {
  return await prisma.post.findMany({ where: { user_id: userId } });
};

export const updatePost = async (postId, postData) => {
  return await prisma.post.update({
    where: { post_id: postId },
    data: postData,
  });
};

export const deletePost = async (postId) => {
  return await prisma.post.delete({ where: { post_id: postId } });
};
