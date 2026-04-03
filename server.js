// ======================
// 🔹 IMPORTS (Modules)
// ======================
const express = require("express"); // Framework → server create ചെയ്യാൻ
const dotenv = require("dotenv"); // Environment variables load ചെയ്യാൻ
const connectDB = require("./config/db"); // Database connection function

// ======================
// 🔹 CONFIG SETUP
// ======================
dotenv.config(); // .env variables process.env ലേക്ക് load ചെയ്യുന്നു

// ======================
// 🔹 DATABASE INIT
// ======================
connectDB(); // MongoDB connect ചെയ്യുന്നു

// ======================
// 🔹 APP INIT
// ======================
const app = express(); // Express server instance create ചെയ്യുന്നു

// ======================
// 🔹 ROUTE MODULES
// ======================
const authRoutes = require("./routes/authRoutes"); // Auth (login/register)
const projectRoutes = require("./routes/projectRoutes"); // Projects CRUD
const taskRoutes = require("./routes/taskRoutes"); // Tasks CRUD
const commentRoutes = require("./routes/commentRoutes"); // Comments system

// ======================
// 🔹 GLOBAL MIDDLEWARE
// ======================
app.use(express.json()); 
// JSON request body → JS object ആക്കുന്നു
// ഇല്ലെങ്കിൽ req.body undefined ആയിരിക്കും

// ======================
// 🔹 ROUTE MOUNTING
// ======================
app.use("/api/auth", authRoutes);
// Example: /api/auth/login

app.use("/api/projects", projectRoutes);
// Example: /api/projects/create

app.use("/api/tasks", taskRoutes);

app.use("/api/comments", commentRoutes);

// ======================
// 🔹 HEALTH CHECK ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("TeamSync API Running");
});
// Server working ആണോ എന്ന് test ചെയ്യാൻ

// ======================
// 🔹 PORT CONFIG
// ======================
const PORT = process.env.PORT || 5000;
// Production → env port
// Development → 5000 fallback

// ======================
// 🔹 SERVER START
// ======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Server start ചെയ്യുന്നു