# ⚡ TeamSync Frontend - Quick Start Guide

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm run dev

# 3. Open browser
# http://localhost:5000
```

That's it! 🚀

---

## What You'll See

### First Time
1. Redirected to `/login`
2. Click "Create one now"
3. Fill registration form
4. You're logged in & on dashboard!

### Dashboard View
- 4 stat cards at top
- Recent projects
- Your assigned tasks
- Everything auto-updates

---

## Key Pages

| Page | URL | Access |
|------|-----|--------|
| Login | `/login` | Anyone |
| Register | `/register` | Anyone |
| Dashboard | `/dashboard` | Logged in users |
| Projects | `/projects` | Logged in users |
| Tasks | `/tasks` | Logged in users |
| Notifications | `/notifications` | Logged in users |
| Profile | `/profile` | Logged in users |

---

## What You Can Do

### 👤 As Member
- ✅ View projects
- ✅ See assigned tasks
- ✅ Update task status (drag or dropdown)
- ✅ Add comments to tasks
- ✅ View notifications
- ✅ Edit profile

### 👨‍💼 As Manager/Admin
- ✅ All member features
- ✅ Create new projects
- ✅ Manage project members
- ✅ Create tasks
- ✅ Edit projects
- ✅ Delete projects/tasks

---

## Testing the App

### Test Users (from backend test data)

**Admin Account**
- Email: `admin@teamsync.com`
- Password: `password123`

**Manager Account**
- Email: `manager@teamsync.com`
- Password: `password123`

**Member Account**
- Email: `user@teamsync.com`
- Password: `password123`

*Or create your own account during registration*

---

## API Testing

### All Endpoints Work
- 21 total API endpoints
- All integrated with frontend
- JWT token authentication
- Real-time updates

### Test with Postman
```
Collection file: docs/postman_collection.json
- Import into Postman
- Run collection tests
- Verify all endpoints
```

---

## Troubleshooting

### Server won't start?
```bash
# Check port 5000 is free
lsof -i :5000

# Try different port
PORT=5001 npm run dev
```

### Getting 404 on pages?
- Ensure server is fully started
- Check console for errors
- Try hard refresh (Ctrl+Shift+R)

### API calls failing?
- Check backend is running
- Check `.env` file
- Check MONGODB_URI
- Check JWT_SECRET

### Styling looks broken?
- Hard refresh (Ctrl+Shift+R)
- Check CSS file exists: `/public/css/style.css`
- Check Network tab for errors

---

## File Structure Quick Reference

```
teamsync/
├── server.js              ← Main entry point
├── package.json           ← Dependencies
├── public/
│   ├── css/style.css      ← All styling
│   └── js/api.js          ← API calls
├── views/
│   ├── layout.ejs         ← Base template
│   ├── partials/          ← Navbar, sidebar
│   └── pages/             ← 9 page templates
├── controllers/frontend/  ← Page rendering logic
├── routes/frontend/       ← Frontend routing
├── docs/                  ← Full documentation
└── .env                   ← Configuration
```

---

## Key Features

✨ **Authentication**
- Secure login/register
- JWT token management
- Session persistence

⚙️ **Projects**
- Create & manage projects
- Add team members
- Track status

✅ **Tasks**
- Kanban board view
- Drag-to-update status
- Comments & discussion

🔔 **Notifications**
- Real-time alerts
- Mark as read
- Auto-refresh

👤 **Profile**
- User information
- Account management
- Logout

---

## Environment Variables

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/teamsync
JWT_SECRET=your-secret-key-for-jwt-tokens
PORT=5000
```

---

## Full Documentation

For complete details, see:
- `docs/FRONTEND_DOCUMENTATION.md` - Architecture & features
- `docs/INTEGRATION_GUIDE.md` - Setup & deployment
- `docs/FRONTEND_COMPLETION_REPORT.md` - Status & summary

---

## Common Commands

```bash
# Install dependencies
npm install

# Start development server (auto-reload)
npm run dev

# Stop server
# Press Ctrl+C in terminal

# View logs
# Check terminal output

# Database
# MongoDB must be running on localhost:27017
```

---

## Success Indicators

✅ **You'll know it's working when:**
- Server logs show "Server running on port 5000"
- Browser opens http://localhost:5000
- You can register & login
- Dashboard loads with stats
- You can create a project
- Task status updates work
- Notifications appear

---

## Next Steps

1. ✅ Install & start
2. ✅ Create test account
3. ✅ Create a project
4. ✅ Create some tasks
5. ✅ Try drag-to-update on tasks
6. ✅ Add comments
7. ✅ Explore all pages
8. ✅ Deploy when ready

---

## Deployment

### Local Testing
```bash
npm run dev
# http://localhost:5000
```

### Production
```bash
npm install --production
NODE_ENV=production npm start
```

See `docs/DEPLOYMENT_GUIDE.md` for full deployment instructions.

---

## Support

**Issues?**
1. Check browser console (F12)
2. Check server logs
3. Read `docs/INTEGRATION_GUIDE.md`
4. Verify `.env` settings
5. Restart server

---

**Version**: 1.0.0  
**Status**: ✅ Ready to Use  
**Time to Setup**: < 5 minutes  
**Lines of Code**: ~3500
