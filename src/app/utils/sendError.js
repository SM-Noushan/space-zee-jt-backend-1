const errorResponse = (res, message, code = 500) =>
  res.status(code).json({ message, statusCode: code, success: false });

export default errorResponse;
