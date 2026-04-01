# 🚀 TeamSync (Backend Project Management System)

## 📌 Description
TeamSync is a scalable backend system for managing projects, users, and tasks (similar to Jira/Trello). This project is being built step-by-step following industry-level backend architecture. Currently, Phase 1 → Phase 4 are completed: Project setup & server configuration, Authentication system (Register + Login + JWT), Project management system, Task management system.

## 🎯 Features Implemented (So Far)

### 🔧 Phase 1: Project Setup
Express server setup, MongoDB connection using Mongoose, Environment configuration using dotenv, Basic route testing, Clean folder structure.

### 🔐 Phase 2: Authentication System
User registration, User login, Password hashing using bcrypt, JWT token generation, Protected routes using middleware, Basic error handling.

### 📁 Phase 3: Project Module
Create project, Get user-specific projects, Add members to project, Owner-based authorization, Secure project access (only members can view).

### 📌 Phase 4: Task Module
Create tasks inside project, Assign tasks to members, Validate assigned user belongs to project, Fetch tasks by project, Update task status (TODO → IN_PROGRESS → DONE), Only assigned user can update task.

## 🧠 Tech Stack
Backend: Node.js, Express.js  
Database: MongoDB (Mongoose)  
Security: JWT Authentication, bcrypt password hashing  
Tools: dotenv, nodemon, morgan  

## 📁 Folder Structure
teamsync/
├── config/db.js
├── controllers/authController.js, projectController.js, taskController.js
├── models/User.js, Project.js, Task.js
├── routes/authRoutes.js, projectRoutes.js, taskRoutes.js
├── middleware/authMiddleware.js
├── utils/generateToken.js
├── .env
├── server.js
├── package.json

## ⚙️ Installation & Setup
1. Clone Repository → git clone <your-repo-url> && cd teamsync  
2. Install Dependencies → npm install  
3. Setup .env → PORT=5000, MONGO_URI=your_mongodb_url, JWT_SECRET=your_secret_key  
4. Run Server → npm run dev  
Server runs on http://localhost:5000

## 🔗 API Endpoints (Implemented)
AUTH → POST /api/auth/register, POST /api/auth/login  
PROJECT → POST /api/projects, GET /api/projects, PUT /api/projects/:id/add-member  
TASK → POST /api/tasks, GET /api/tasks/:projectId, PUT /api/tasks/:id  

## 🔐 Authorization
Authorization: Bearer <token>

## 🧠 How It Works (Flow)
User registers → password hashed → user logs in → JWT token generated → client sends token → middleware verifies token → req.user set → user creates project → owner adds members → tasks created inside project → tasks assigned → assigned users update status.

## ⚠️ Edge Cases Handled
Duplicate user registration, Invalid login credentials, Missing token, Invalid token, User not part of project, Task assigned to non-member, Only owner can add members, Only assigned user can update task.

## 🧪 Testing
Register user → Login → Copy token → Add Authorization header → Create project → Add members → Create task → Fetch tasks → Update task status.

## 📈 Next Steps (Upcoming Features)
Comment system (task discussion), Role-based access control, Notifications (Socket.io), Activity logs, File uploads (Cloudinary), Redis caching.

## 🧠 Developer Mindset
Clean architecture, Scalable backend design, Security best practices, Real-world API structure, Industry-level thinking.

## 👨‍💻 Author
Ramesh (Learning Backend Engineering Step-by-Step 🚀)