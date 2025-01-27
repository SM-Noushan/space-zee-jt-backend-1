import axios from "axios";
import { User } from "./user.model.js";
import mongoose, { Types } from "mongoose";
import config from "../../config/index.js";
import { UserDetailsApi } from "../../api/userDetails/userDetailsApi.js";

const createUserIntoDB = async (payload) => {
  const { username, email, password, bio, interests } = payload;

  //check if user already exists
  const isUserExists = await User.isUserExistsByEmail(email);
  //   console.log(isUserExists);
  if (isUserExists) {
    return {
      error: true,
      errorDetails: { message: "User already exists", code: 409 },
    };
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  // Save sensitive data
  const user = await User.create(
    [{ username, email: email.toLowerCase(), password }],
    { session }
  );

  //   Save non sensitive data
  let userDetail;
  try {
    userDetail = await axios.post(
      UserDetailsApi,
      { bio, interests, user: email },
      {
        headers: { Authorization: `Bearer 1${config.secretToken}` },
      }
    );
    await session.commitTransaction();
    // console.log(userDetail);
  } catch (err) {
    await session.abortTransaction();
    return {
      error: true,
      errorDetails: {
        message: err?.response?.data || "Something went wrong",
        code: err?.status,
      },
    };
    // console.log({ err: error.response.data });
  } finally {
    await session.endSession();
  }
  return {
    user,
    details: userDetail?.data?.data,
  };
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
