// ======================
// 🔹 IMPORT
// ======================
const jwt = require("jsonwebtoken"); 
// JWT library → token verify ചെയ്യാൻ

// ======================
// 🔹 MIDDLEWARE FUNCTION
// ======================
const protect = (req, res, next) => {
  let token;

  // ======================
  // 🔹 CHECK HEADER
  // ======================
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Authorization: Bearer <token>
    token = req.headers.authorization.split(" ")[1];
    // "Bearer abc123" → ["Bearer", "abc123"]

    try {
      // ======================
      // 🔹 VERIFY TOKEN
      // ======================
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // token valid ആണോ എന്ന് check ചെയ്യുന്നു

      // ======================
      // 🔹 ATTACH USER
      // ======================
      req.user = decoded;
      // user data request ലേക്ക് attach ചെയ്യുന്നു

      return next();
      // അടുത്ത middleware / controller ലേക്ക് പോകുന്നു

    } catch (error) {
      // ======================
      // 🔹 TOKEN ERROR
      // ======================
      return res.status(401).json({ message: "Token failed" });
    }
  }

  // ======================
  // 🔹 NO TOKEN
  // ======================
  return res.status(401).json({ message: "No token" });
};

// ======================
// 🔹 EXPORT
// ======================
module.exports = { protect };