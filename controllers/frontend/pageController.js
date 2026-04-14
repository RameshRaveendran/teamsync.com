// ============================================
// Frontend Dashboard Controller
// ============================================

const renderDashboard = (req, res) => {
  // Frontend handles authentication via JWT in localStorage
  // Just render the page
  res.render('pages/dashboard');
};

module.exports = {
  renderDashboard
};
