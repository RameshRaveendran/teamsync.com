// ============================================
// Frontend Routes
// ============================================

const express = require('express');
const authController = require('../controllers/frontend/authController');
const pageController = require('../controllers/frontend/pageController');
const resourceController = require('../controllers/frontend/resourceController');

const router = express.Router();

// ============================================
// AUTH Routes (No middleware needed)
// ============================================

// GET /login - Show login page
router.get('/login', authController.renderLogin);

// GET /register - Show register page
router.get('/register', authController.renderRegister);

// ============================================
// DASHBOARD Route
// ============================================

// GET /dashboard - Dashboard page
router.get('/dashboard', pageController.renderDashboard);

// ============================================
// PROJECTS Routes
// ============================================

// GET /projects - List all projects
router.get('/projects', resourceController.renderProjects);

// GET /project/create - Create project page
router.get('/project/create', resourceController.renderCreateProject);

// GET /project/:projectId - Project detail
router.get('/project/:projectId', resourceController.renderProjectDetail);

// GET /project/:projectId/edit - Edit project page
router.get('/project/:projectId/edit', resourceController.renderProjectDetail); // Use detail page with edit mode

// ============================================
// TASKS Routes
// ============================================

// GET /tasks - List all tasks
router.get('/tasks', resourceController.renderTasks);

// GET /task/:taskId - Task detail
router.get('/task/:taskId', resourceController.renderTaskDetail);

// ============================================
// NOTIFICATIONS Route
// ============================================

// GET /notifications - Notifications page
router.get('/notifications', resourceController.renderNotifications);

// ============================================
// PROFILE Route
// ============================================

// GET /profile - User profile
router.get('/profile', resourceController.renderProfile);

// ============================================
// HOME Route (Redirect)
// ============================================

// GET / - Redirect to dashboard or login
router.get('/', (req, res) => {
  const token = req.cookies?.token || req.query?.token;
  
  if (token) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
