// ============================================
// Frontend Auth Controller - Render auth pages
// ============================================

// Render login page
const renderLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('pages/login');
};

// Render register page
const renderRegister = (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  res.render('pages/register');
};

module.exports = {
  renderLogin,
  renderRegister
};
