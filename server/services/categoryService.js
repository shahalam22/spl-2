import prisma from "../lib/prisma.js"; // Import the Prisma Client instance

// Create a new category
export const createCategory = async (data) => {
  return await prisma.category.create({
    data,
  });
};

// Get a category by ID
export const getCategoryById = async (category_id) => {
  return await prisma.category.findUnique({
    where: { category_id },
    include: {
      posts: true, // Include associated posts
    },
  });
};

// Get all categories
export const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      posts: true, // Include associated posts
    },
  });
};

// Update a category by ID
export const updateCategory = async (category_id, data) => {
  return await prisma.category.update({
    where: { category_id },
    data,
  });
};

// Delete a category by ID
export const deleteCategory = async (category_id) => {
  return await prisma.category.delete({
    where: { category_id },
  });
};
