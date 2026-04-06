// ======================
// 🔹 IMPORTS (Modules)
// ======================
const http = require("http");
const express = require("express"); // Framework → server create ചെയ്യാൻ
const dotenv = require("dotenv"); // Environment variables load ചെയ്യാൻ
const connectDB = require("./config/db"); // Database connection function
const { Server } = require("socket.io");

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
// 🔹 SOCKET.IO UPDATES
// ======================

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ NEW: Join task room
  socket.on("joinTask", (taskId) => {
    console.log(`User ${socket.id} joined task room: task-${taskId}`);
    socket.join(`task-${taskId}`); 
  });

  // ✅ NEW: Leave task room
  socket.on("leaveTask", (taskId) => {
    console.log(`User ${socket.id} left task room: task-${taskId}`);
    socket.leave(`task-${taskId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ======================
// 🔹 ROUTE MODULES
// ======================
const authRoutes = require("./routes/authRoutes"); // Auth (login/register)
const projectRoutes = require("./routes/projectRoutes"); // Projects CRUD
const taskRoutes = require("./routes/taskRoutes"); // Tasks CRUD
const commentRoutes = require("./routes/commentRoutes"); // Comments system
const errorHandler = require("./middleware/errorMiddleware"); // Error handling

// ======================
// 🔹 GLOBAL MIDDLEWARE
// ======================
app.use(express.json()); 
// JSON request body → JS object ആക്കുന്നു
// ഇല്ലെങ്കിൽ req.body undefined ആയിരിക്കും

// ⚠️ ATTACH IO TO REQUEST (before routes)
app.use((req, res, next) => {
  req.io = io;
  next();
});

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
// 🔹 ERROR MIDDLEWARE (Must be last!)
// ======================
app.use(errorHandler);

// ======================
// 🔹 PORT CONFIG
// ======================
const PORT = process.env.PORT || 5000;
// Production → env port
// Development → 5000 fallback

// ======================
// 🔹 SERVER START
// ======================
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO ready for connections`);
});
// Server start ചെയ്യുന്നു via HTTP server (required for Socket.IO)