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

export const UserServices = {
  createUserIntoDB,
};
