// import prisma from "../lib/prisma.js";

// export const createUser = async (userData) => {
//   console.log(userData);
//   return await prisma.user.create({ data: userData });
// };

// export const getUserById = async (userId) => {
//   return await prisma.user.findUnique({ where: { user_id: userId } });
// };

// export const getUserByEmail = async (email) => {
//   return await prisma.user.findUnique({ where: { email } });
// };

// export const updateUser = async (userId, userData) => {
//   return await prisma.user.update({
//     where: { user_id: userId },
//     data: userData,
//   });
// };

// export const deleteUser = async (userId) => {
//   return await prisma.user.delete({ where: { user_id: userId } });
// };




// new file

import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

// Register a new user
export const createUser = async (userData) => {
  const { username, email, password} = userData;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      username,
      email,
      hashedPassword,
    },
  });
};

// Find a user by email
export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Find a user by username
export const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

// Find a user by ID
export const getUserById = async (userId) => {
  // console.log(userId);
  
  return await prisma.user.findUnique({
    where: { user_id: userId },
  });
};

// Update user profile
export const updateUser = async (userId, userData) => {
  return await prisma.user.update({
    where: { user_id: userId },
    data: userData,
  });
};

// Delete a user
export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { user_id: userId },
  });
};
