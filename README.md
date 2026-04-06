# 🚀 TeamSync (Backend Project Management System)

## 📌 Description

TeamSync is a scalable backend system for managing projects, tasks, and team collaboration (similar to Jira/Trello).
Built step-by-step following **industry-level backend architecture, security practices, and real-world design patterns**.

Currently Completed:
Phase 1 → Setup  
Phase 2 → Authentication  
Phase 3 → Project Management  
Phase 4 → Task Management  
Phase 5 → Comment System (Collaboration)  
Phase 6 → Role-Based Access Control (RBAC) ✅  
Phase 7 → Real-Time System (Socket.io) 🔥  

---

## 🎯 Features

### 🔐 Authentication

* User Registration  
* User Login  
* Password hashing (bcrypt)  
* JWT-based authentication  
* Protected routes  
* Token-based user identity (req.user)  

---

### 📁 Project Management

* Create project  
* Get user-specific projects  
* Add members to project  
* Owner-based authorization  
* Only members can access project  

---

### 📌 Task Management

* Create tasks inside project  
* Assign tasks to members  
* Validate assigned user belongs to project  
* Fetch tasks by project  
* Update task status (TODO → IN_PROGRESS → DONE)  
* Only assigned user can update task  

---

### 💬 Comment System

* Add comments to tasks  
* Fetch comments by task  
* Only project members can comment  
* Linked with users & tasks (relations)  
* Populate user details in comments  

---

### 🔐 Role-Based Access Control

* Role system: **Admin / Manager / Member**  
* Admin → full control  
* Manager → manage tasks  
* Member → limited access  
* Middleware-based role validation  
* Secure route-level permissions  

---

### ⚡ Real-Time System (NEW 🔥)

* Instant updates using **Socket.io**  
* No page refresh required  
* Live comment updates across users  
* Event-based communication (emit / on)  
* Server → client push mechanism  
* Integrated with existing comment system  
* Real-time collaboration like Jira/Slack  

---

## 🧠 Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Real-Time:** Socket.io  
**Security:** JWT, bcrypt, RBAC  
**Tools:** dotenv, nodemon, morgan  

---

## 📁 Folder Structure


teamsync/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── projectController.js
│ ├── taskController.js
│ └── commentController.js
├── middleware/
│ ├── authMiddleware.js
│ ├── roleMiddleware.js
│ └── errorMiddleware.js
├── models/
│ ├── User.js
│ ├── Project.js
│ ├── Task.js
│ └── Comment.js
├── routes/
│ ├── authRoutes.js
│ ├── projectRoutes.js
│ ├── taskRoutes.js
│ └── commentRoutes.js
├── utils/
│ ├── generateToken.js
│ └── hashPassword.js
├── validations/
│ └── validators.js
├── docs/
│ └── postman_collection.json
├── server.js
├── package.json
└── README.md


---

## ⚙️ Installation & Setup

```bash
git clone <your-repo-url>
cd teamsync
npm install
Create .env file:
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
NODE_ENV=development
Run server:
npm run dev

Server runs on:
👉 http://localhost:5000

🔗 API Endpoints
AUTH
POST /api/auth/register
POST /api/auth/login
PROJECT
POST /api/projects
GET /api/projects
PUT /api/projects/:id/add-member
DELETE /api/projects/:id (Admin only)
TASK
POST /api/tasks
GET /api/tasks/:projectId
PUT /api/tasks/:id
COMMENT
POST /api/comments
GET /api/comments/:taskId
🔐 Authorization
Authorization: Bearer <token>
🧠 System Flow

User registers
→ Password hashed
→ User logs in
→ JWT token generated (id + role)
→ Token sent in requests
→ Auth middleware verifies token
→ req.user available

Then:

User creates project
→ Adds members
→ Creates tasks
→ Assigns tasks
→ Updates task status
→ Adds comments
→ 🔥 Real-time event emitted
→ All connected users receive update instantly

⚠️ Edge Cases Handled
Duplicate user registration
Invalid login credentials
Missing / invalid token
User not part of project
Task assigned to non-member
Only owner can add members
Only assigned user can update task
Only project members can comment
Unauthorized role access (RBAC)
Real-time event mismatch / connection issues
🧪 Testing Flow
Register user
Login → Copy token
Add Authorization header
Create project
Add members
Create task
Add comment
🔥 Open browser console (socket connect)
Send comment via Postman
Verify real-time update in browser
📈 Next Steps (Phase 8+ 🚀)
🧩 Rooms (project-based real-time isolation)
🔔 Notifications system
🧠 Activity logs
☁️ File uploads (Cloudinary)
⚡ Redis (scaling sockets)
📊 Analytics dashboard
🧠 Developer Mindset
Clean architecture
Scalable backend design
Secure API development
Middleware-driven control
Real-time system thinking
Debugging mindset
👨‍💻 Author

Ramesh
Backend Engineering Journey 🚀
From basics → Real-world system design