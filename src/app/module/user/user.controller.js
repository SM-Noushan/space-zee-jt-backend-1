import { UserServices } from "./user.service.js";
import catchAsync from "../../utils/catchAsync.js";
import errorResponse from "../../utils/sendError.js";
import sendResponse from "../../utils/sendResponse.js";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body, res);
  if (result?.error)
    return errorResponse(
      res,
      result.errorDetails.message,
      result.errorDetails.code
    );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
};
