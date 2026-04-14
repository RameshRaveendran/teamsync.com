// ============================================
// Frontend Resource Controller
// ============================================

// Render projects list
const renderProjects = (req, res) => {
  const user = req.user || res.locals.user;
  if (!user) return res.redirect('/login');

  res.render('pages/projects', { user });
};

// Render project detail
const renderProjectDetail = (req, res) => {
  const user = req.user || res.locals.user;
  if (!user) return res.redirect('/login');

  const { projectId } = req.params;

  res.render('pages/project-detail', { 
    user,
    projectId 
  });
};

// Render create project
const renderCreateProject = (req, res) => {
  const user = req.user || res.locals.user;
  
  if (!user || (user.role !== 'Admin' && user.role !== 'Manager')) {
    return res.redirect('/projects');
  }

  res.render('pages/create-project', { user });
};

// Render tasks list
const renderTasks = (req, res) => {
  const user = req.user || res.locals.user;
  if (!user) return res.redirect('/login');

  res.render('pages/tasks', { user });
};

// Render task detail
const renderTaskDetail = (req, res) => {
  const user = req.user || res.locals.user;
  if (!user) return res.redirect('/login');

  const { taskId } = req.params;

  res.render('pages/task-detail', { 
    user,
    taskId 
  });
};

// Render notifications
const renderNotifications = (req, res) => {
  const user = req.user || res.locals.user;
  if (!user) return res.redirect('/login');

  res.render('pages/notifications', { user });
};

// Render profile
const renderProfile = (req, res) => {
  const user = req.user || res.locals.user;
  if (!user) return res.redirect('/login');

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  res.render('pages/profile', { 
    user,
    initials,
    joinDate
  });
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
