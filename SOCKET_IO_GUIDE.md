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
socket.on("newComment", (comment) => {
  console.log("New comment received:", comment);
  console.log("Author:", comment.userId.name);
  console.log("Text:", comment.text);
  console.log("Created:", comment.createdAt);
  
  // Add comment to UI
  // updateCommentsList(comment);
});
```

### Step 4: Leave Room When Closing Task
```javascript
// When user navigates away from task view
socket.emit("leaveTask", taskId);
console.log("Unsubscribed from task updates");
```

### Complete Example Component
```javascript
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const TaskComments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 1. Initialize socket
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // 2. Fetch existing comments
    const fetchComments = async () => {
      const res = await axios.get(`/api/comments/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data);
    };

    fetchComments();

    // 3. Join task room
    newSocket.emit("joinTask", taskId);

    // 4. Listen for new comments
    newSocket.on("newComment", (newComment) => {
      setComments(prev => [...prev, newComment]);
    });

    // 5. Cleanup on unmount
    return () => {
      newSocket.emit("leaveTask", taskId);
      newSocket.disconnect();
    };
  }, [taskId]);

  const handleAddComment = async (text) => {
    const res = await axios.post(`/api/comments`, 
      { taskId, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Comments will be added via socket.on("newComment")
  };

  return (
    <div>
      <h3>Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <div key={comment._id}>
          <strong>{comment.userId.name}</strong>
          <p>{comment.text}</p>
          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      ))}
      <form onSubmit={(e) => {
        e.preventDefault();
        const text = e.target.text.value;
        handleAddComment(text);
        e.target.text.value = '';
      }}>
        <input name="text" placeholder="Add comment..." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default TaskComments;
```

---

## 🔄 Data Flow

```
Frontend (React)
    ↓
    ├─→ 1. User views task
    ├─→ 2. socket.emit("joinTask", taskId)
    ├─→ 3. Fetch existing comments via HTTP GET
    └─→ 4. Listen for socket.on("newComment")
         ↓
    Backend (Node.js)
         ↓
         ├─→ POST /api/comments (create comment)
         ├─→ Save to MongoDB
         ├─→ Populate user data
         └─→ io.to(`task-${taskId}`).emit("newComment")
              ↓
         Frontend receives real-time update
         User sees new comment instantly ✨
```

---

## 🚀 Real-Time Features Enabled

✅ **Instant comment notifications** - See new comments without refreshing  
✅ **Room-based communication** - Comments only go to relevant users  
✅ **Populated user data** - Author name + email included in event  
✅ **Timestamps** - `createdAt` and `updatedAt` for each comment  

---

## 📝 Testing Socket.IO

### Test 1: Check Server is Running with Socket.IO
```bash
npm run dev
# Should see:
# Server running on port 5000
# Socket.IO ready for connections
```

### Test 2: Check Console Logs
**Backend (Terminal)**:
```
User connected: abc123def
User abc123def joined task room: task-123456789
New comment created...
```

**Frontend (Browser Console)**:
```
Connected to server: xyz789abc
New comment received: { ... }
```

---

## ⚠️ Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Socket not receiving comments" | `app.listen()` used instead of `server.listen()` | ✅ Already fixed |
| "req.io is undefined" | Middleware added after routes | ✅ Already fixed |
| Comments go to all users | Using `emit()` instead of `to()` | ✅ Already fixed |
| CORS errors | Socket server blocking origins | Check `cors.origin` config |
| "Socket.IO client not responding" | Mismatched URL/port | Ensure localhost:5000 matches server |

---

## 🔒 Advanced: Add Authentication to Socket.IO (Optional)

```javascript
// server.js - Add auth middleware for Socket.IO
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error("Authentication required"));
  }
  
  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Invalid token"));
    socket.userId = decoded.id;
    next();
  });
});
```

---

## ✨ Next Steps

1. Install socket.io-client in your frontend: `npm install socket.io-client`
2. Implement the component example above
3. Test with multiple browser windows
4. Add to all real-time features (tasks, projects, etc.)

Happy coding! 🚀
