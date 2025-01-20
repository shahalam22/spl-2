import prisma from "../lib/prisma.js";

export const createUser = async (userData) => {
  return await prisma.user.create({ data: userData });
};

export const getUserById = async (userId) => {
  return await prisma.user.findUnique({ where: { user_id: userId } });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const updateUser = async (userId, userData) => {
  return await prisma.user.update({
    where: { user_id: userId },
    data: userData,
  });
};

export const deleteUser = async (userId) => {
  return await prisma.user.delete({ where: { user_id: userId } });
};
