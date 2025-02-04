import prisma from "../lib/prisma.js"; // Import the Prisma Client instance

// Create a new transaction
export const createTransaction = async (data) => {
  return await prisma.transaction.create({
    data,
  });
};

// Get a transaction by ID
export const getTransactionById = async (transaction_id) => {
  return await prisma.transaction.findUnique({
    where: { transaction_id },
    include: {
      post: true, // Include associated post details
      user: true, // Include associated user details
    },
  });
};

// Get all transactions
export const getAllTransactions = async () => {
  return await prisma.transaction.findMany({
    include: {
      post: true, // Include associated post details
      user: true, // Include associated user details
    },
  });
};

// Update a transaction by ID
export const updateTransaction = async (transaction_id, data) => {
  return await prisma.transaction.update({
    where: { transaction_id },
    data,
  });
};

// Delete a transaction by ID
export const deleteTransaction = async (transaction_id) => {
  return await prisma.transaction.delete({
    where: { transaction_id },
  });
};
