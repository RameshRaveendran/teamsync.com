# 🚀 TeamSync (Backend Project Management System)

## 📌 Description

TeamSync is a scalable backend system for managing projects, users, and tasks (similar to Jira/Trello).
This project is being built step-by-step following industry-level backend architecture.

Currently, Phase 1 and Phase 2 are completed:

* Project setup & server configuration
* Authentication system (Register + Login + JWT)

---

## 🎯 Features Implemented (So Far)

### 🔧 Phase 1: Project Setup

* Express server setup
* MongoDB connection using Mongoose
* Environment configuration using dotenv
* Basic route testing
* Clean folder structure

### 🔐 Phase 2: Authentication System

* User registration
* User login
* Password hashing using bcrypt
* JWT token generation
* Protected routes using middleware
* Basic error handling

---

## 🧠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Security

* JWT Authentication
* bcrypt password hashing

### Tools

* dotenv
* nodemon
* morgan

---

## 📁 Folder Structure

teamsync/
│
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── middleware/
│   └── authMiddleware.js
├── utils/
│   └── generateToken.js
├── .env
├── server.js
├── package.json

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd teamsync
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

### 4. Run Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 🔗 API Endpoints (Implemented)

### 🔐 AUTH

#### Register User

```
POST /api/auth/register
```


#### Login User

```
POST /api/auth/login
```

Response:

```json
{
  "_id": "...",
  "name": "Ramesh",
  "token": "JWT_TOKEN"
}
```

---

## 🔐 Authorization

For protected routes, send token in header:

```
Authorization: Bearer <token>
```

---

## 🧠 How It Works (Flow)

1. User registers → data saved in database
2. Password is hashed using bcrypt
3. User logs in → credentials verified
4. Server generates JWT token
5. Client sends token for protected routes
6. Middleware verifies token and allows access

---

## ⚠️ Edge Cases Handled

* Duplicate user registration
* Invalid login credentials
* Missing token
* Invalid token

---

## 🧪 Testing

Use Postman:

1. Register a user
2. Login and copy token
3. Use token in Authorization header
4. Test protected routes

---

## 📈 Next Steps (Upcoming Features)

* Project module (Create, Update, Delete)
* Task management system
* Comments system
* Role-based access control
* Notifications (Socket.io)
* File uploads (Cloudinary)

---

## 🧑‍💻 Developer Mindset

This project focuses on:

* Clean architecture
* Scalability
* Security best practices
* Real-world backend patterns

---

## 👨‍💻 Author

Ramesh (Learning Backend Engineering Step-by-Step 🚀)
