# 🧪 TeamSync API - Testing Guide

## 📋 Overview
Complete guide for testing all TeamSync API endpoints using Postman, cURL, or any HTTP client.

---

## 🔐 Authentication Setup

All endpoints (except `/api/auth/*`) require a Bearer token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Base URL
```
http://localhost:5000
```

---

## 🧾 Testing Workflow

### 1️⃣ Step 1: Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Expected Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE3MTMwNDAwMDAsImV4cCI6MTcxMzY0NDgwMH0.x9..."
}
```

**Save the token for next requests!**

---

### 2️⃣ Step 2: Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Expected Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📁 Project Management Testing

### 3️⃣ Create Project
**Endpoint:** `POST /api/projects`

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Website Redesign",
  "description": "Complete redesign of company website"
}
```

**Expected Response (201):**
```json
{
  "message": "Project created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Website Redesign",
    "description": "Complete redesign of company website",
    "owner": "507f1f77bcf86cd799439011",
    "members": ["507f1f77bcf86cd799439011"],
    "createdAt": "2024-04-14T10:00:00Z",
    "updatedAt": "2024-04-14T10:00:00Z"
  }
}
```

**Save the project ID for task creation!**

---

### 4️⃣ Get All User Projects
**Endpoint:** `GET /api/projects`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Expected Response (200):**
```json
{
  "message": "Projects retrieved successfully",
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Website Redesign",
      "owner": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "members": [...]
    }
  ]
}
```

---

### 5️⃣ Get Single Project
**Endpoint:** `GET /api/projects/:id`

**URL Example:**
```
GET /api/projects/507f1f77bcf86cd799439012
```

**Expected Response (200):**
```json
{
  "message": "Project retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Website Redesign",
    "owner": {...},
    "members": [...]
  }
}
```

---

### 6️⃣ Update Project
**Endpoint:** `PUT /api/projects/:id`

**Request Body:**
```json
{
  "title": "Website Redesign - Phase 2",
  "description": "Updated description"
}
```

**Expected Response (200):**
```json
{
  "message": "Project updated successfully",
  "data": {...}
}
```

---

### 7️⃣ Add Member to Project
**Endpoint:** `POST /api/projects/:id/members`

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439013"
}
```

**Expected Response (200):**
```json
{
  "message": "Member added successfully",
  "data": {
    "members": [
      {...},
      {...}
    ]
  }
}
```

---

### 8️⃣ Remove Member from Project
**Endpoint:** `DELETE /api/projects/:id/members`

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439013"
}
```

**Expected Response (200):**
```json
{
  "message": "Member removed successfully",
  "data": {...}
}
```

---

### 9️⃣ Delete Project
**Endpoint:** `DELETE /api/projects/:id`

**Expected Response (200):**
```json
{
  "message": "Project deleted successfully"
}
```

---

## 📌 Task Management Testing

### 1️⃣ Create Task
**Endpoint:** `POST /api/tasks`

**Note:** Only Admin/Manager roles can create tasks.

**Request Body:**
```json
{
  "title": "Design Homepage",
  "projectId": "507f1f77bcf86cd799439012",
  "assignedTo": "507f1f77bcf86cd799439013"
}
```

**Expected Response (201):**
```json
{
  "message": "Task created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Design Homepage",
    "projectId": "507f1f77bcf86cd799439012",
    "assignedTo": "507f1f77bcf86cd799439013",
    "status": "TODO",
    "createdAt": "2024-04-14T10:30:00Z"
  }
}
```

**Save the task ID for future updates!**

---

### 2️⃣ Get Tasks by Project
**Endpoint:** `GET /api/tasks/:projectId`

**URL Example:**
```
GET /api/tasks/507f1f77bcf86cd799439012
```

**Expected Response (200):**
```json
{
  "message": "Tasks retrieved successfully",
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Design Homepage",
      "status": "TODO",
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    }
  ]
}
```

---

### 3️⃣ Update Task Status
**Endpoint:** `PUT /api/tasks/:id`

**Valid statuses:** `TODO`, `IN_PROGRESS`, `DONE`

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Expected Response (200):**
```json
{
  "message": "Task updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "IN_PROGRESS",
    "updatedAt": "2024-04-14T11:00:00Z"
  }
}
```

**Status Flow Example:**
1. Create task → status: **TODO**
2. Start working → status: **IN_PROGRESS**
3. Complete → status: **DONE**

---

### 4️⃣ Delete Task
**Endpoint:** `DELETE /api/tasks/:id`

**Expected Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 💬 Comment Management Testing

### 1️⃣ Add Comment
**Endpoint:** `POST /api/comments`

**Request Body:**
```json
{
  "taskId": "507f1f77bcf86cd799439020",
  "text": "This looks great! I'll review it today."
}
```

**Expected Response (201):**
```json
{
  "message": "Comment added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "taskId": "507f1f77bcf86cd799439020",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "text": "This looks great! I'll review it today.",
    "createdAt": "2024-04-14T12:00:00Z"
  }
}
```

---

### 2️⃣ Get Task Comments
**Endpoint:** `GET /api/comments/:taskId`

**URL Example:**
```
GET /api/comments/507f1f77bcf86cd799439020
```

**Expected Response (200):**
```json
{
  "message": "Comments retrieved successfully",
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "taskId": "507f1f77bcf86cd799439020",
      "userId": {...},
      "text": "This looks great!",
      "createdAt": "2024-04-14T12:00:00Z"
    }
  ]
}
```

---

## 🔔 Notification Management Testing

### 1️⃣ Get All Notifications
**Endpoint:** `GET /api/notifications`

**Expected Response (200):**
```json
{
  "message": "Notifications retrieved successfully",
  "unreadCount": 3,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "userId": "507f1f77bcf86cd799439011",
      "message": "You have been assigned a new task: Design Homepage",
      "type": "TASK_ASSIGNED",
      "isRead": false,
      "createdAt": "2024-04-14T10:30:00Z"
    }
  ]
}
```

---

### 2️⃣ Get Unread Count
**Endpoint:** `GET /api/notifications/unread/count`

**Expected Response (200):**
```json
{
  "message": "Unread count retrieved",
  "unreadCount": 3
}
```

---

### 3️⃣ Mark Notification as Read
**Endpoint:** `PUT /api/notifications/:id/read`

**Expected Response (200):**
```json
{
  "message": "Notification marked as read",
  "data": {
    "_id": "507f1f77bcf86cd799439040",
    "isRead": true
  }
}
```

---

### 4️⃣ Mark All as Read
**Endpoint:** `PUT /api/notifications/read/all`

**Expected Response (200):**
```json
{
  "message": "All notifications marked as read"
}
```

---

### 5️⃣ Delete Notification
**Endpoint:** `DELETE /api/notifications/:id`

**Expected Response (200):**
```json
{
  "message": "Notification deleted successfully"
}
```

---

### 6️⃣ Delete All Notifications
**Endpoint:** `DELETE /api/notifications`

**Expected Response (200):**
```json
{
  "message": "All notifications deleted successfully"
}
```

---

## ❌ Error Scenarios

### 1️⃣ Missing Authentication Token
**Request:**
```
GET /api/projects
```

**Response (401):**
```json
{
  "message": "Not authorized"
}
```

---

### 2️⃣ Invalid Token
**Request:**
```
GET /api/projects
Authorization: Bearer invalid_token_12345
```

**Response (401):**
```json
{
  "message": "Invalid token"
}
```

---

### 3️⃣ Insufficient Permissions
**Scenario:** Non-manager trying to create task

**Request:**
```
POST /api/tasks
Authorization: Bearer <member_token>
{
  "title": "Task",
  "projectId": "...",
  "assignedTo": "..."
}
```

**Response (403):**
```json
{
  "message": "Access denied. Role (member) not allowed"
}
```

---

### 4️⃣ Resource Not Found
**Request:**
```
GET /api/projects/invalid_id_123
```

**Response (404):**
```json
{
  "message": "Project not found"
}
```

---

### 5️⃣ Invalid Input
**Request:**
```
POST /api/auth/register
{
  "name": "J",
  "email": "invalid-email",
  "password": "123"
}
```

**Response (400):**
```json
{
  "errors": [
    "Name must be at least 2 characters",
    "Invalid email format",
    "Password must be at least 6 characters"
  ]
}
```

---

## 🔄 Complete User Journey

### Flow 1: Create and Manage Project
```
1. Register → POST /api/auth/register
2. Login → POST /api/auth/login
3. Create Project → POST /api/projects
4. Get Projects → GET /api/projects
5. Update Project → PUT /api/projects/:id
6. Delete Project → DELETE /api/projects/:id
```

### Flow 2: Task Assignment and Update
```
1. Create Task → POST /api/tasks (as Manager)
2. Get Tasks → GET /api/tasks/:projectId
3. Assigned user receives notification
4. Assigned user updates status → PUT /api/tasks/:id
5. Get updated notification → GET /api/notifications
6. Mark notification as read → PUT /api/notifications/:id/read
```

### Flow 3: Collaboration via Comments
```
1. Add comment to task → POST /api/comments
2. Get comments → GET /api/comments/:taskId
3. All members notified via Socket.io
4. View comments on task
```

---

## 🧪 cURL Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Create Project
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Task Title",
    "projectId": "project_id_here",
    "assignedTo": "user_id_here"
  }'
```

---

## 📊 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal error |

---

## 🚀 Integration Checklist

- [ ] Register new user
- [ ] Login and get token
- [ ] Create project
- [ ] Add members to project
- [ ] Create task
- [ ] Update task status
- [ ] Add comments
- [ ] View notifications
- [ ] Test error scenarios
- [ ] Verify all role-based access

---

## 📝 Notes

- Tokens expire after 7 days
- All timestamps are in UTC (ISO 8601 format)
- ObjectIds are MongoDB 24-character hex strings
- Maximum comment length: 1000 characters
- Valid task statuses: TODO, IN_PROGRESS, DONE
- Valid roles: member (default), manager, admin

---

## 🔗 Quick Links

- API Base: http://localhost:5000
- MongoDB Compass: Connection to your MongoDB instance
- Postman: Create collection from tests
- GitHub: Push code with feature branches
