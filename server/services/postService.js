import prisma from "../lib/prisma.js";

export const createPost = async (postData) => {
  return await prisma.post.create({ data: postData });
};

export const getPostById = async (postId) => {
  try {
    postId = parseInt(postId, 10);

    if (isNaN(postId)) {
      throw new Error('Invalid post ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        post_id: postId,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    console.error('Error fetching post by ID:', error.message);
    throw error;
  }
};

export const getAllPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostsByUser = async (userId) => {
  return await prisma.post.findMany({ where: { user_id: userId } });
};

export const updatePost = async (postId, postData) => {
  postId = parseInt(postId, 10);
  return await prisma.post.update({
    where: { post_id: postId },
    data: postData,
  });
};

export const deletePost = async (postId) => {
  try {
    const parsedPostId = parseInt(postId, 10);

    if (isNaN(parsedPostId)) {
      throw new Error('Invalid post ID');
    }

    // Delete related transactions first
    await prisma.transaction.deleteMany({
      where: {
        post_id: parsedPostId,
      },
    });

    // Now delete the post
    const deletedPost = await prisma.post.delete({
      where: {
        post_id: parsedPostId,
      },
    });

    return deletedPost;
  } catch (error) {
    console.error('Error deleting post:', error.message);
    throw error;
  }
};
