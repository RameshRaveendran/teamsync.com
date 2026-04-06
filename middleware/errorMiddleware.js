// =====================
// 🔹 ERROR MIDDLEWARE
// =====================

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      message: "Validation Error",
      errors: messages,
      error: err.message
    });
  }

  // Mongoose Cast Error (Invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${err.kind} format: "${err.value}"`,
      error: "Cast Error"
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value",
      error: "Duplicate Key Error"
    });
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
      error: "Authentication Error"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired",
      error: "Token Expired"
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    error: err.name || "Error"
  });
};

module.exports = errorHandler;
