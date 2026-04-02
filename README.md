# 🚀 TeamSync (Backend Project Management System)

## 📌 Description
TeamSync is a scalable backend system for managing projects, tasks, and team collaboration (similar to Jira/Trello).  
Built step-by-step following industry-level backend architecture and best practices.

Currently Completed:
Phase 1 → Setup  
Phase 2 → Authentication  
Phase 3 → Project Management  
Phase 4 → Task Management  
Phase 5 → Comment System (Collaboration)

---

## 🎯 Features

### 🔐 Authentication
- User Registration
- User Login
- Password hashing (bcrypt)
- JWT-based authentication
- Protected routes

### 📁 Project Management
- Create project
- Get user-specific projects
- Add members to project
- Owner-based authorization
- Only members can access project

### 📌 Task Management
- Create tasks inside project
- Assign tasks to members
- Validate assigned user belongs to project
- Fetch tasks by project
- Update task status (TODO → IN_PROGRESS → DONE)
- Only assigned user can update task

### 💬 Comment System (NEW)
- Add comments to tasks
- Fetch comments by task
- Only project members can comment
- Linked with users & tasks (relations)
- Populate user details in comments

---

## 🧠 Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Security:** JWT, bcrypt  
**Tools:** dotenv, nodemon, morgan  

---

## 📁 Folder Structure


.
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── projectController.js
│ ├── taskController.js
│ └── commentController.js
├── middleware/
│ ├── authMiddleware.js
│ ├── errorMiddleware.js
│ └── roleMiddleware.js
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
→ JWT token generated
→ Token sent in requests
→ Middleware verifies token
→ req.user available

Then:

User creates project
→ Adds members
→ Creates tasks
→ Assigns tasks
→ Updates task status
→ Adds comments inside tasks

⚠️ Edge Cases Handled
Duplicate user registration
Invalid login credentials
Missing / invalid token
User not part of project
Task assigned to non-member
Only owner can add members
Only assigned user can update task
Only project members can comment
🧪 Testing Flow (Postman)
Register user
Login → Copy token
Add Authorization header
Create project
Add members
Create task
Fetch tasks
Update task status
Add comment
Fetch comments
📈 Next Steps
Role-Based Access Control (Admin/User)
Real-time updates (Socket.io)
Notifications system
Activity logs
File uploads (Cloudinary)
Redis caching
🧠 Developer Mindset
Clean architecture
Scalable backend design
Secure API development
Real-world system thinking
👨‍💻 Author

Ramesh
Backend Engineering Journey 🚀