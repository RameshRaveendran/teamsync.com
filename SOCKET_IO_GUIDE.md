# Socket.IO Implementation Guide - TeamSync

## 🔧 Fixed Issues

### ❌ Bug #1: Server Listening Method (CRITICAL)
**Problem**: `app.listen()` was being used instead of `server.listen()`
```javascript
// ❌ WRONG - Bypasses Socket.IO
app.listen(PORT, () => {});

// ✅ FIXED - Uses HTTP server for Socket.IO
server.listen(PORT, () => {});
```

### ❌ Bug #2: Middleware Order
**Problem**: `req.io` middleware was added AFTER routes
```javascript
// ❌ WRONG - Routes added first, then middleware
app.use("/api/comments", commentRoutes);
app.use((req, res, next) => { req.io = io; next(); });

// ✅ FIXED - Middleware BEFORE routes
app.use((req, res, next) => { req.io = io; next(); });
app.use("/api/comments", commentRoutes);
```

### ❌ Bug #3: Broadcasting to All Users
**Problem**: Comments sent to ALL connected clients (inefficient, privacy issue)
```javascript
// ❌ WRONG - Broadcasts to everyone
req.io.emit("newComment", comment);

// ✅ FIXED - Sends only to users viewing that task
req.io.to(`task-${taskId}`).emit("newComment", comment);
```

---

## 📱 Frontend Implementation

### Step 1: Initialize Socket Connection
```javascript
import io from 'socket.io-client';

// Connect to server
const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});
```

### Step 2: Join Task Room When Opening Task
```javascript
// When user opens/views a task
const taskId = "123456789"; // Task ID from route params

socket.emit("joinTask", taskId);
console.log("Subscribed to task updates");
```

### Step 3: Listen for New Comments
```javascript