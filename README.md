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

### 🔐 Role-Based Access Control (NEW 🔥)

* Role system: **Admin / Manager / Member**
* Admin → full control (delete project, manage system)
* Manager → manage tasks
* Member → limited access
* Middleware-based role validation
* Secure route-level permissions
* Prevent unauthorized operations

---

## 🧠 Tech Stack

**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Security:** JWT, bcrypt, RBAC
**Tools:** dotenv, nodemon, morgan

---

## 📁 Folder Structure

```
teamsync/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   ├── taskController.js
│   └── commentController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Project.js
│   ├── Task.js
│   └── Comment.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   └── commentRoutes.js
├── utils/
│   ├── generateToken.js
│   └── hashPassword.js
├── validations/
│   └── validators.js
├── docs/
│   └── postman_collection.json
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

```bash
git clone <your-repo-url>
cd teamsync
npm install
```

### Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Run server:

```bash
npm run dev
```

Server runs on:
👉 http://localhost:5000

---

## 🔗 API Endpoints

### AUTH

* POST /api/auth/register
* POST /api/auth/login

### PROJECT

* POST /api/projects
* GET /api/projects
* PUT /api/projects/:id/add-member
* DELETE /api/projects/:id (Admin only)

### TASK

* POST /api/tasks
* GET /api/tasks/:projectId
* PUT /api/tasks/:id

### COMMENT

* POST /api/comments
* GET /api/comments/:taskId

---

## 🔐 Authorization

```http
Authorization: Bearer <token>
```

---

## 🧠 System Flow

User registers
→ Password hashed
→ User logs in
→ JWT token generated (contains id + role)
→ Token sent in requests
→ Auth Middleware verifies token
→ req.user available

Then:

User creates project
→ Adds members
→ Creates tasks
→ Assigns tasks
→ Updates task status
→ Adds comments inside tasks
→ Role middleware checks permissions before sensitive actions

---

## ⚠️ Edge Cases Handled

* Duplicate user registration
* Invalid login credentials
* Missing / invalid token
* User not part of project
* Task assigned to non-member
* Only owner can add members
* Only assigned user can update task
* Only project members can comment
* Unauthorized role access (RBAC)
* Invalid route handler (fixed import/export issues)

---

## 🧪 Testing Flow (Postman)

1. Register user
2. Login → Copy token
3. Add Authorization header
4. Create project
5. Add members
6. Create task
7. Fetch tasks
8. Update task status
9. Add comment
10. Fetch comments
11. Test role-based access (Admin vs Member)

---

## 📈 Next Steps (Phase 7+ 🚀)

* 🔔 Real-time updates (Socket.io)
* 📡 Notifications system
* 🧠 Activity logs
* ☁️ File uploads (Cloudinary)
* ⚡ Redis caching
* 📊 Analytics dashboard

---

## 🧠 Developer Mindset

* Clean architecture
* Scalable backend design
* Secure API development
* Middleware-driven control
* Real-world system thinking
* Debugging mindset (like fixing handler errors)

---

## 👨‍💻 Author

**Ramesh**
Backend Engineering Journey 🚀
From basics → Real-world system design
