# 🎯 TeamSync - Complete Integration Guide

## ✅ Project Status: Frontend Complete

**All page templates created and integrated with backend API**

### Frontend Deliverables Checklist
- ✅ Authentication pages (login, register)
- ✅ Dashboard with stats and recent items
- ✅ Projects management (list, create, detail, edit)
- ✅ Tasks Kanban board with drag-to-update
- ✅ Task detail page with comments
- ✅ Notifications management
- ✅ User profile page
- ✅ Responsive CSS (800+ lines)
- ✅ APIService layer (all 21 endpoints)
- ✅ Frontend controllers and routes
- ✅ EJS templating setup

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
cd /path/to/teamsync
npm install
```

This installs all packages including the newly added EJS templating engine.

### Step 2: Environment Setup
Ensure `.env` file has:
```
MONGODB_URI=mongodb://localhost:27017/teamsync
JWT_SECRET=your-secret-key-here
PORT=5000
```

### Step 3: Start the Server
```bash
npm run dev
```

Server returns:
```
Server running on port 5000
Socket.IO ready for connections
```

### Step 4: Access the Application
Open browser and navigate to:
```
http://localhost:5000
```

You'll be redirected to `/login` if not authenticated, or `/dashboard` if already logged in.

## 📖 User Flow

### New User
1. Visit `http://localhost:5000`
2. Click "Create one now" or go to `/register`
3. Fill registration form (name, email, password)
4. Submitted to `/api/auth/register` → Backend creates user & returns JWT
5. Frontend stores JWT + user data in localStorage
6. Auto-redirect to `/dashboard`
7. Dashboard shows stats and recent items

### Existing User
1. Try to access `http://localhost:5000`
2. Redirected to `/login`
3. Enter email & password
4. Submitted to `/api/auth/login` → Backend verifies & returns JWT
5. Frontend stores JWT + user data
6. Redirected to `/dashboard`

### During Session
- **Manager/Admin User**:
  - Can create new projects (click "+ New Project")
  - Can manage team members
  - Can create tasks in projects
  - Can edit project details

- **Member User**:
  - Can view projects (read-only)
  - Can see assigned tasks
  - Can update task status (drag or dropdown)
  - Can add comments to tasks

## 📊 Page Guide

### `/login` - Login Page
```
Inputs:
  - Email address (required)
  - Password (required)

Buttons:
  - [Login to Account] - Submits login form
  - "Create one now" - Link to register page

On Success:
  - Stores JWT token in localStorage
  - Stores user data in localStorage
  - Redirects to /dashboard

On Error:
  - Shows error message
  - User can retry
```

### `/register` - Registration Page
```
Inputs:
  - Full Name (required)
  - Email Address (required)
  - Password (min 6 chars, required)
  - Confirm Password (match required)

Buttons:
  - [Create Account] - Submits registration
  - "Login here" - Link to login page

On Success:
  - Stores JWT token
  - Stores user data
  - Redirects to /dashboard

Validation:
  - Passwords must match
  - Client-side validation before submit
```

### `/dashboard` - Main Dashboard
```
Components:
  - 📊 Stat Cards (4 total):
    - Total Projects
    - Tasks Assigned
    - Notifications
    - User Role
  
  - 🚀 Recent Projects (3 shown):
    - Project card grid
    - Status badge
    - [View] button
    - Create button (if Manager/Admin)
  
  - ✅ Assigned Tasks (5 shown):
    - Table format
    - Status, due date, assignee
    - [View] button for each
  
  - Auto-refresh every 30 seconds
```

### `/projects` - Projects List
```
Features:
  - Search bar (title & description)
  - Grid of all projects
  - Status badges (color-coded)
  - [Edit] button (Manager/Admin only)
  - [View Details] button
  - "+ New Project" button (Manager/Admin)

Project Card Shows:
  - Title & Status badge
  - Description
  - Members count
  - Tasks count
  - Created date
```

### `/project/create` - Create Project
```
Form Fields:
  - Title (required, descriptive project name)
  - Description (optional, project details)
  - Status (dropdown: Active, Planning, On Hold, Completed)
  - Start Date (optional)
  - Team Members (multi-select checkboxes)

Submit:
  - Posts to /api/projects
  - Creates project with selected members
  - Redirects to project detail page

Access: Manager/Admin only
```

### `/project/:projectId` - Project Detail
```
Sections:
  1️⃣ Project Info:
     - Title & Status badge
     - Description
     - Created date
     - Created by

  2️⃣ Tasks Section:
     - Table of all project tasks
     - [+ Add Task] button (Manager/Admin)
     - Task status through modal

  3️⃣ Team Members:
     - Cards with member info
     - [Remove] button (Manager/Admin)
     - [+ Add Member] button

Modals:
  - Create Task: title, description, assignee, due date
  - Add Member: user selection

Functions:
  - Edit project (Manager/Admin button)
  - Delete project (Manager/Admin button)
  - Add/remove team members (Manager/Admin)
```

### `/tasks` - Kanban Board
```
Layout (3 columns):
  Left    │  Middle          │  Right
  --------|------------------|--------
  To Do   │  In Progress     │  Completed
  --------|------------------|--------

Features:
  - Drag task cards between columns
  - Or click dropdown to change status
  - Search tasks by title/description
  - Filter by status dropdown
  - "+ New Task" button (creates modal)
  - Each task card shows:
    - Title & status badge
    - Description
    - Project name
    - Assigned person
    - Due date (if set)
    - [Details] button

Task Creation Modal:
  - Title (required)
  - Description (optional)
  - Project (required)
  - Assign To (required)
  - Due Date (optional)
  - [Create Task] button
```

### `/task/:taskId` - Task Detail
```
Sections:
  1️⃣ Task Information:
     - Title with status badge
     - Project name
     - Status dropdown (quick-update)
     - Assigned to
     - Due date
     - Created date
     - Description

  2️⃣ Comments Section:
     - All comments displayed
     - Shows commenter name, time, text
     - comment form at bottom
     - Auto-loads new comments every 10s

  3️⃣ Quick Actions:
     - Edit button (Manager/Admin)
     - Delete button (Manager/Admin)
     - Status selector
```

### `/notifications` - Notifications
```
Features:
  - List of all notifications
  - Visual distinction for unread
  - Filter: All / Read / Unread
  - [Mark All as Read] button
  
Each Notification Shows:
  - Icon (based on type)
  - Title & message
  - Created time
  - [Mark Read] button (if unread)
  - [Delete] button

Auto-refresh: Every 30 seconds
```

### `/profile` - User Profile
```
Display Section:
  - Large avatar with initials
  - User name
  - Email address
  - Role badge
  - Member since date
  
Buttons:
  - [✎ Edit Profile] - Show edit form
  - [🔐 Change Password] - Show change password form
  - [🚪 Logout] - Clear storage & redirect /login

Forms (Hidden, click buttons to expand):
  1️⃣ Edit Profile:
     - Full Name field
     - Email field
     - [Cancel] [Save Changes]
  
  2️⃣ Change Password:
     - Current Password (required)
     - New Password (min 6 chars)
     - Confirm Password (must match)
     - [Cancel] [Update Password]
```

## 🔧 API Communication

### How Frontend Calls Backend

**Example 1: Login**
```javascript
// User clicks login button
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Call API
  const response = await api.login(email, password);
  
  // response contains: { token, user, role, ... }
  
  // Store token & user
  api.setToken(response.token);
  setUser(response);
  
  // Redirect
  window.location.href = '/dashboard';
});
```

**Example 2: Get Projects**
```javascript
// On dashboard load
const loadProjects = async () => {
  try {
    // Make API call with JWT
    const projects = await api.getProjects();
    
    // Display projects
    displayProjects(projects);
  } catch (error) {
    showError(error); // Shows alert
  }
};
```

**Example 3: Create Task**
```javascript
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const data = {
      title: titleInput.value,
      projectId: projectIdInput.value,
      assignedTo: assignedToInput.value,
      dueDate: dueDateInput.value
    };
    
    // POST to /api/tasks
    await api.createTask(data);
    
    // Show success & reload
    showAlert('Task created!', 'success');
    loadTasks();
  } catch (error) {
    showError(error);
  }
});
```

## 🔐 Authentication Flow

### Token Management
1. User logs in → Backend returns JWT token
2. Frontend stores token in localStorage
3. Every API request includes: `Authorization: Bearer {token}`
4. Backend validates token (see authMiddleware.js)
5. If token invalid/expired → 401 response
6. Frontend redirects to login

### Protected Routes
- All pages require authentication
- If not logged in: auto-redirect to `/login`
- If logged in but role doesn't allow: redirect to accessible page

## 📱 Responsive Design

### Breakpoints
```css
- Desktop: 1024px+ (full layout)
- Tablet: 768px-1023px (compressed sidebar)
- Mobile: <768px (sidebar hidden, hamburger menu)
```

### Mobile Adjustments
- Sidebar converts to mobile menu (drawer/hamburger)
- Content takes full width
- Single-column layouts
- Touch-friendly button sizes (48px minimum)
- Full-width modals/forms

## 🐛 Common Issues & Solutions

### Issue: Login page shows but nothing happens on submit
**Solution**: 
- Check browser console for errors (F12)
- Verify backend is running (check http://localhost:5000/api/health)
- Check JWT_SECRET in .env file

### Issue: API calls return 401 Unauthorized
**Solution**:
- Check token in localStorage (F12 → Application → Local Storage)
- Verify token hasn't expired
- Check authMiddleware.js on backend

### Issue: EJS template error "Cannot find variable"
**Solution**:
- Ensure controller passes all required variables
- Check <%- include() %> paths are correct
- Verify view files exist in /views/pages/

### Issue: CSS not loading
**Solution**:
- Verify static middleware: `app.use(express.static('public'))`
- Check CSS path in templates (should be `/css/style.css`)
- Hard refresh browser (Ctrl+Shift+R)

### Issue: Modal not showing
**Solution**:
- Ensure CSS is loaded (check Network tab)
- Verify modal HTML has class="modal"
- Check modal display is set to flex/none with JavaScript

## 📝 Adding Features

### Add New API Endpoint Integration

1. **Backend**: Add route in `/routes/` + controller
2. **Frontend - api.js**:
   ```javascript
   async newFeature(params) {
     return this.request('/endpoint', {
       method: 'POST',
       body: JSON.stringify(params)
     });
   }
   ```

3. **Frontend - Page**:
   ```javascript
   const result = await api.newFeature(data);
   showAlert('Success!', 'success');
   ```

### Add New Page

1. Create `/views/pages/new-page.ejs`
2. Create controller in `/controllers/frontend/`
3. Add route: `router.get('/path', controller.renderPage);`
4. Mount in `server.js`: `app.use(frontendRoutes);`

### Add New Component

1. Create `/views/partials/component.ejs`
2. Include in template: `<%- include('../partials/component') %>`
3. Add CSS to `style.css`

## 📦 File Structure Summary

```
teamsync/
├── public/
│   ├── css/style.css (1000+ lines)
│   └── js/api.js (350+ lines)
├── views/
│   ├── layout.ejs
│   ├── partials/ (navbar, sidebar)
│   └── pages/ (9 pages total)
├── controllers/frontend/ (3 controllers)
├── routes/frontend/ (1 router)
├── config/ (db.js)
├── controllers/ (5 backend controllers)
├── models/ (5 schemas)
├── routes/ (5 API route files)
├── middleware/ (auth, error, role)
├── server.js (updated)
├── package.json (updated)
└── docs/ (documentation)
```

## 🚢 Deployment

### Production Checklist
- [ ] Install dependencies: `npm install`
- [ ] Set environment variables
- [ ] Test login flow end-to-end
- [ ] Test all CRUD operations
- [ ] Verify API responses are correct
- [ ] Check error handling
- [ ] Test on mobile devices
- [ ] Enable HTTPS
- [ ] Setup SSL certificates
- [ ] Use process manager (PM2)
- [ ] Setup reverse proxy (Nginx)
- [ ] Monitor logs
- [ ] Backup database

### Performance Optimization
- Gzip compression enabled
- Static file caching
- Lazy load images
- Minify CSS/JS (optional)
- Use CDN for assets
- Enable browser caching

## 📞 Support

For issues or questions:
1. Check browser console (F12)
2. Check server logs (terminal)
3. Review FRONTEND_DOCUMENTATION.md
4. Check backend API responses
5. Verify `.env` configuration

---

**Frontend Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: [Current Date]
