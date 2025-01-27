import catchAsync from "../utils/catchAsync.js";

const validateRequest = (fn) =>
  catchAsync(async (req, res, next) => {
    await fn(req, res, next);
  });

export default validateRequest;
