import errorResponse from "../../utils/sendError.js";

export const validateUserData = (req, res, next) => {
  const { username, email, password, bio, interests } = req.body;
  const missingFields = [];

  if (!username) missingFields.push("username");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (!bio) missingFields.push("bio");
  if (!Array.isArray(interests))
    missingFields.push("interests (must be an array)");
  else if (interests.length === 0)
    missingFields.push("interests (must not be empty)");

  if (missingFields.length > 0) {
    return errorResponse(
      res,
      `Missing or invalid fields: ${missingFields.join(", ")}`,
      400
    );
  }
  next();
};
