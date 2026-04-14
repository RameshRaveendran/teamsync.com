// ============================================
// Frontend Dashboard Controller
// ============================================

const renderDashboard = (req, res) => {
  // Get user from session/JWT (will be passed via locals)
  const user = req.user || res.locals.user;
  
  if (!user) {
    return res.redirect('/login');
  }

  res.render('pages/dashboard', { user });
};

module.exports = {
  renderDashboard
};
