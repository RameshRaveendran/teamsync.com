# 🚀 TeamSync - Project Management System
A scalable backend system for managing projects, tasks, and team collaboration (similar to Jira/Trello). Built with Node.js, Express, and MongoDB following industry-level practices.

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Role-Based Access Control](#-role-based-access-control)
- [Real-Time Updates](#-real-time-updates)
- [Testing](#-testing)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)

---

## 📌 Overview

TeamSync is a production-ready project management backend that demonstrates:
- ✅ Scalable REST API architecture
- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Real-time updates with Socket.io
- ✅ Comprehensive error handling
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation
- ✅ Clean code practices

**Completed Phases:**
- Phase 1: Setup & Configuration ✅
- Phase 2: Authentication ✅
- Phase 3: Project Management ✅
- Phase 4: Task Management ✅
- Phase 5: Comment System ✅
- Phase 6: Role-Based Access Control ✅
- Phase 7: Real-Time Notifications ✅

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js 5.x |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Hashing** | bcryptjs |
| **Real-Time** | Socket.io |
| **Environment** | dotenv |
| **Logging** | Morgan |
| **Dev Tools** | Nodemon |

---

## 🎯 Features

### 🔐 Authentication & Security
- User registration with email uniqueness validation
- Secure login with bcryptjs password hashing
- JWT-based session management (7-day expiration)
- Protected routes with middleware
- Token verification and user context (`req.user`)

### 📁 Project Management
- Create projects with title and description
- Add/remove team members to projects
- Get all user projects
- Get single project details
- Update project information
- Delete projects (owner only)
- Member management with authorization

### 📌 Task Management
- Create tasks within projects
- Assign tasks to project members
- Track task status (TODO → IN_PROGRESS → DONE)
- Update task status (assigned user only)
- Delete tasks (assigned user or project owner)
- Populate task details with user info

### 💬 Comment & Collaboration
- Add comments to tasks
- Fetch all task comments (most recent first)
- Comment validation (text not empty, max 1000 chars)
- Real-time comment updates via Socket.io
- User context in each comment

### 🔔 Notifications (Real-Time)
- Task assignment notifications
- Socket.io event emissions
- Notification persistence in database
- Status tracking (read/unread)

### 👥 Role-Based Access Control (RBAC)
- **Admin**: Full system control, delete projects/tasks
- **Manager**: Create and manage tasks
- **Member**: Assigned tasks, view projects, comment

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/teamsync.git
cd teamsync
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and fill in your values
nano .env
```

4. **Start the server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on http://localhost:5000 (or your configured PORT)

---

## ⚙️ Configuration

### Environment Variables
See `.env.example` for all available options:

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/teamsync

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# CORS (optional)
CORS_ORIGIN=*
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📁 Project Structure

```
teamsync/
│
├── config/
│   └── db.js                 # MongoDB connection
│
├── controllers/
│   ├── authController.js    # Auth logic (register, login)
│   ├── projectController.js # Project CRUD operations
│   ├── taskController.js    # Task CRUD operations
│   └── commentController.js # Comment operations
│
├── models/
│   ├── User.js              # User schema
│   ├── Project.js           # Project schema
│   ├── Task.js              # Task schema
│   ├── Comment.js           # Comment schema
│   └── Notification.js      # Notification schema
│
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── projectRoutes.js     # Project endpoints
│   ├── taskRoutes.js        # Task endpoints
│   └── commentRoutes.js     # Comment endpoints
│
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   ├── errorMiddleware.js   # Global error handler
│   └── roleMiddleware.js    # RBAC authorization
│
├── utils/
│   ├── generateToken.js     # JWT token generation
│   └── hashPassword.js      # Password hashing utility
│
├── validations/
│   └── validators.js        # Input validation functions
│
├── docs/
│   └── postman_collection.json # Postman requests
│
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── README.md                # This file
├── server.js                # Entry point
└── package.json             # Dependencies
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "_id": "123456789",
  "name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "_id": "123456789",
  "name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Project Endpoints

All project endpoints require authentication:
```
Authorization: Bearer <your_token>
```

#### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "title": "Website Redesign",
  "description": "Redesign company website"
}
```

#### Get All User Projects
```http
GET /api/projects
```

#### Get Single Project
```http
GET /api/projects/:id
```

#### Update Project (Owner only)
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Add Member to Project (Owner only)
```http
POST /api/projects/:id/members
Content-Type: application/json

{
  "userId": "user_object_id"
}
```

#### Remove Member (Owner only)
```http
DELETE /api/projects/:id/members
Content-Type: application/json

{
  "userId": "user_object_id"
}
```

#### Delete Project (Owner only)
```http
DELETE /api/projects/:id
```

---

### Task Endpoints

#### Create Task (Admin/Manager only)
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Design Homepage",
  "projectId": "project_object_id",
  "assignedTo": "user_object_id"
}
```

#### Get Tasks by Project
```http
GET /api/tasks/:projectId
```

#### Update Task Status (Assigned user only)
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

Valid statuses: `TODO`, `IN_PROGRESS`, `DONE`

#### Delete Task (Assigned user or project owner)
```http
DELETE /api/tasks/:id
```

---

### Comment Endpoints

#### Add Comment
```http
POST /api/comments
Content-Type: application/json

{
  "taskId": "task_object_id",
  "text": "This needs revision"
}
```

#### Get Task Comments
```http
GET /api/comments/:taskId
```

---

## 🗄 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ["admin", "manager", "member"], default: "member"),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  owner: ObjectId (ref: User, required),
  members: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  projectId: ObjectId (ref: Project, required),
  assignedTo: ObjectId (ref: User, required),
  status: String (enum: ["TODO", "IN_PROGRESS", "DONE"], default: "TODO"),
  dueDate: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  _id: ObjectId,
  taskId: ObjectId (ref: Task, required),
  userId: ObjectId (ref: User, required),
  text: String (required, max 1000 chars),
  projectId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Notification Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  message: String,
  type: String (e.g., "TASK_ASSIGNED", "COMMENT"),
  isRead: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

### JWT Flow
1. User registers/logs in
2. Server generates JWT token with user ID and role
3. Client stores token (localStorage, sessionStorage, cookie)
4. Client sends token in Authorization header: `Bearer <token>`
5. Server verifies token and attaches user to request (`req.user`)

### Token Structure
```javascript
{
  id: "user_object_id",
  role: "member|manager|admin",
  iat: 1234567890,
  exp: 1234654290  // 7 days
}
```

### Protected Routes
Protected endpoints require valid JWT token. If invalid/missing:
```json
{
  "message": "Not authorized",
  "statusCode": 401
}
```

---

## 👥 Role-Based Access Control

| Action | Admin | Manager | Member |
|--------|-------|---------|--------|
| Create Project | ✅ | ✅ | ✅ |
| Update Own Project | ✅ | ✅ (own) | ✅ (own) |
| Delete Project | ✅ | (own) | (own) |
| Create Task | ✅ | ✅ | ❌ |
| Update Task Status | ✅ | ✅ | ✅ (assigned) |
| Add Members | ✅ | (own projects) | (own projects) |
| View All Projects | ✅ | ✅ | ✅ (members only) |

---

## 🔄 Real-Time Updates

### Socket.io Events

#### Client connects to project
```javascript
socket.emit("joinProject", projectId);
```

#### Server emits task notification
```javascript
io.to(userId).emit("notification", {
  type: "TASK_ASSIGNED",
  message: "You have been assigned a task"
});
```

#### Server emits new comment
```javascript
io.to(`task-${taskId}`).emit("newComment", {
  _id: "...",
  text: "...",
  userId: {...}
});
```

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Import `docs/postman_collection.json`
3. Set collection variables:
   - `base_url`: http://localhost:5000
   - `token`: (leave blank, will be set after login)

### Testing Flow
1. **Register** → POST `/api/auth/register`
2. **Login** → POST `/api/auth/login` (copy token)
3. **Create Project** → POST `/api/projects`
4. **Create Task** → POST `/api/tasks`
5. **Add Comment** → POST `/api/comments`

### Common Issues
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **400 Bad Request**: Invalid input or required fields missing

---

## 🚀 Future Enhancements

- [ ] Email notifications
- [ ] File upload (Cloudinary)
- [ ] Task filtering and search
- [ ] Project templates
- [ ] Team management
- [ ] Advanced analytics dashboard
- [ ] Webhook integrations
- [ ] API rate limiting
- [ ] Caching with Redis
- [ ] Message queuing (Bull/RabbitMQ)
- [ ] Automated testing (Jest/Mocha)
- [ ] Docker containerization
- [ ] GraphQL API

---

## 📊 Database Relationships

```
User (1) ──→ (Many) Project
           ──→ (Many) Task
           ──→ (Many) Comment
           ──→ (Many) Notification

Project (1) ──→ (Many) Task
            ──→ (Many) Member (User)

Task (1) ──→ (Many) Comment
         ──→ (1) AssignedUser
         ──→ (1) Project

Comment (Many) ──→ (1) Task
              ──→ (1) User
```

---

## 🔍 Error Handling

All errors follow this format:
```json
{
  "message": "User-friendly error message",
  "error": "Error type (e.g., Validation Error)",
  "statusCode": 400
}
```

**Error Types:**
- `400 Bad Request`: Invalid input or validation error
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## 📝 Development Notes

### Code Organization
- Separation of concerns (routes, controllers, models)
- Middleware for auth, validation, error handling
- Utility functions for common operations
- Mongoose middleware for validation

### Best Practices Implemented
- ✅ Input validation before DB operations
- ✅ Error handling with custom middleware
- ✅ JWT token verification on protected routes
- ✅ Role-based access control checks
- ✅ Database indexing on frequently queried fields
- ✅ Password hashing with bcryptjs
- ✅ CORS enabled
- ✅ Environment variable management

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE)

---

## 📧 Support

For issues or questions:
- Create an issue on GitHub
- Contact: support@teamsync.com

---

## 🎉 Acknowledgments

Built as a demonstration of industry-level backend development practices with:
- Node.js + Express.js
- MongoDB + Mongoose
- Real-time capabilities with Socket.io
- Security best practices (JWT, bcryptjs)

**Last Updated:** April 2026
**Status:** Production Ready ✅


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