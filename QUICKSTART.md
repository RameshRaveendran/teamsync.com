# 🚀 TeamSync - Quick Start Guide

Get TeamSync running in **5 minutes**!

---

## ⚡ Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org))
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and update:
```
MONGO_URI=mongodb://localhost:27017/teamsync
JWT_SECRET=your_secret_key_here
```

### Step 3: Start Server
```bash
npm run dev
```

✅ Server is running on http://localhost:5000

---

## 📝 Testing Endpoints (Copy-Paste Ready)

### Test Health Check
```bash
curl http://localhost:5000
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**Response:** Copy the `token` value for next requests!

### Create Project
```bash
TOKEN="your_token_here"

curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Project",
    "description": "Project description"
  }'
```

### Get Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛠 Development Commands

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start

# Install new package
npm install package-name

# View MongoDB
mongosh  # if MongoDB installed locally
```

---

## 📍 Important URLs

| Resource | URL |
|----------|-----|
| API Base | http://localhost:5000 |
| Health Check | http://localhost:5000 |
| Postman Collection | `docs/postman_collection.json` |
| MongoDB Local | mongodb://localhost:27017 |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |

---

## 📚 Documentation

- 📖 **Complete Setup:** [README.md](README.md)
- 🧪 **API Testing:** [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)
- 🚀 **Deployment:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- ✅ **Completion Report:** [PROJECT_COMPLETION.md](PROJECT_COMPLETION.md)

---

## ✅ Project Endpoints at a Glance

### Authentication
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Sign in

### Projects
- `POST /api/projects` - Create
- `GET /api/projects` - Get all
- `GET /api/projects/:id` - Get one
- `PUT /api/projects/:id` - Update
- `POST /api/projects/:id/members` - Add member
- `DELETE /api/projects/:id/members` - Remove member
- `DELETE /api/projects/:id` - Delete

### Tasks
- `POST /api/tasks` - Create
- `GET /api/tasks/:projectId` - Get all
- `PUT /api/tasks/:id` - Update status
- `DELETE /api/tasks/:id` - Delete

### Comments
- `POST /api/comments` - Add
- `GET /api/comments/:taskId` - Get all

### Notifications
- `GET /api/notifications` - Get all
- `GET /api/notifications/unread/count` - Count
- `PUT /api/notifications/:id/read` - Mark read
- `DELETE /api/notifications/:id` - Delete

---

## 🔑 Important Notes

1. **Token Format**
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
2. **ObjectId Format** (24-char hex string)
   ```
   507f1f77bcf86cd799439011
   ```

3. **Task Status Values**
   ```
   "TODO", "IN_PROGRESS", "DONE"
   ```

4. **User Roles**
   ```
   "member" (default), "manager", "admin"
   ```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- ✅ Start MongoDB: `mongod`
- ✅ Check connection string in `.env`
- ✅ Use MongoDB Atlas as fallback

### Module Not Found
```bash
rm -rf node_modules
npm install
```

---

## 📞 Next Steps

1. **Explore APIs:** Run the [API Testing Guide](API_TESTING_GUIDE.md)
2. **Import Postman:** Load `docs/postman_collection.json`
3. **Read Code:** Explore `controllers/` and `models/`
4. **Deploy:** Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

**Happy Coding! 🎉**

For detailed docs, see [README.md](README.md)
