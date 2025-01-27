import { Types } from "mongoose";
import { User } from "./user.model.js";

const createUserIntoDB = async (payload) => {
  const { username, email, password, bio, interests } = payload;

  //check if user already exists
  const isUserExists = await User.isUserExistsByUsername(username);
  //   console.log(isUserExists);
  if (isUserExists) {
    return {
      error: true,
      errorDetails: { message: "User already exists", code: 409 },
    };
  }
  // Save sensitive data
  const result = await User.create({ username, email, password });

  return result;
};

const getUserByIdFromDB = async (id) => {
  // Check if the ID is valid
  if (!Types.ObjectId.isValid(id)) {
    return {
      error: true,
      errorDetails: { message: "Invalid ID", code: 400 },
    };
  }

  const user = await User.findById(id);
  if (!user) {
    return {
      error: true,
      errorDetails: { message: "User not found", code: 404 },
    };
  }

  return user;
};

export const UserServices = {
  createUserIntoDB,
  getUserByIdFromDB,
};
