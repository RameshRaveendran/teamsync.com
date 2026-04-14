// ============================================
// Frontend Resource Controller
// ============================================

// Render projects list
const renderProjects = (req, res) => {
  res.render('pages/projects');
};

// Render project detail
const renderProjectDetail = (req, res) => {
  const { projectId } = req.params;
  res.render('pages/project-detail', { projectId });
};

// Render create project
const renderCreateProject = (req, res) => {
  res.render('pages/create-project');
};

// Render tasks list
const renderTasks = (req, res) => {
  res.render('pages/tasks');
};

// Render task detail
const renderTaskDetail = (req, res) => {
  const { taskId } = req.params;
  res.render('pages/task-detail', { taskId });
};

// Render notifications
const renderNotifications = (req, res) => {
  res.render('pages/notifications');
};

// Render profile
const renderProfile = (req, res) => {
  res.render('pages/profile');
};

module.exports = {
  renderProjects,
  renderProjectDetail,
  renderCreateProject,
  renderTasks,
  renderTaskDetail,
  renderNotifications,
  renderProfile
};
