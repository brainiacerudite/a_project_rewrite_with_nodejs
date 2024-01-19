class ValidationError extends Error {
  constructor(
    statusCode,
    message,
    isOperational = true,
    stack = "",
    errors = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ValidationError;
