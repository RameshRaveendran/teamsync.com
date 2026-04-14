// ================================================
// 🔹 API SERVICE - Handle all backend calls
// ================================================

const API_BASE_URL = '/api';

class APIService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  // ============================================
  // 🔹 Helper Methods
  // ============================================

  async request(endpoint, options = {}) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers
      };

      // Add token if exists
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API Error');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // ============================================
  // 🔹 AUTH ENDPOINTS
  // ============================================

  register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  }

  login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  // ============================================
  // 🔹 PROJECT ENDPOINTS
  // ============================================

  createProject(data) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  getProjects() {
    return this.request('/projects', { method: 'GET' });
  }

  getProject(id) {
    return this.request(`/projects/${id}`, { method: 'GET' });
  }

  getProjectById(id) {
    return this.request(`/projects/${id}`, { method: 'GET' });
  }

  updateProject(id, data) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  addMember(projectId, userId) {
    return this.request(`/projects/${projectId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId })
    });
  }

  removeMember(projectId, userId) {
    return this.request(`/projects/${projectId}/members`, {
      method: 'DELETE',
      body: JSON.stringify({ userId })
    });
  }

  removeProjectMember(projectId, userId) {
    return this.removeMember(projectId, userId);
  }

  deleteProject(id) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  // ============================================
  // 🔹 TASK ENDPOINTS
  // ============================================

  createTask(data) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  getTasks() {
    return this.request('/tasks', { method: 'GET' });
  }

  getTask(id) {
    return this.request(`/tasks/${id}`, { method: 'GET' });
  }

  getTasksByProject(projectId) {
    return this.request(`/tasks/project/${projectId}`, { method: 'GET' });
  }

  updateTaskStatus(id, status) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  updateTask(id, data) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  deleteTask(id) {
    return this.request(`/tasks/${id}`, { method: 'DELETE' });
  }

  // ============================================
  // 🔹 COMMENT ENDPOINTS
  // ============================================

  addComment(taskId, text) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify({ taskId, text })
    });
  }

  getComments(taskId) {
    return this.request(`/comments/${taskId}`, { method: 'GET' });
  }

  // ============================================
  // 🔹 NOTIFICATION ENDPOINTS
  // ============================================

  getNotifications() {
    return this.request('/notifications', { method: 'GET' });
  }

  markNotificationRead(id) {
    return this.request(`/notifications/${id}/read`, { method: 'PUT' });
  }

  markNotificationAsRead(id) {
    return this.markNotificationRead(id);
  }

  markAllAsRead() {
    return this.request('/notifications/read/all', { method: 'PUT' });
  }

  deleteNotification(id) {
    return this.request(`/notifications/${id}`, { method: 'DELETE' });
  }

  logout() {
    this.clearToken();
    removeUser();
  }
}

// ================================================
// 🔹 Global API Instance
// ================================================

const api = new APIService();

// ================================================
// 🔹 UI HELPER FUNCTIONS
// ================================================

function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <span>${message}</span>
  `;
  
  const container = document.body;
  container.insertBefore(alertDiv, container.firstChild);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

function showError(error) {
  const message = error.message || 'An error occurred';
  showAlert(message, 'danger');
  console.error(error);
}

function showLoading(element) {
  element.classList.add('loading');
  element.disabled = true;
}

function hideLoading(element) {
  element.classList.remove('loading');
  element.disabled = false;
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

// ================================================
// 🔹 DROPDOWN MENU
// ================================================

document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownContent = document.getElementById('dropdownContent');

  if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener('click', function() {
      dropdownContent.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
      if (e.target !== dropdownBtn && !dropdownContent.contains(e.target)) {
        dropdownContent.classList.remove('show');
      }
    });
  }
});

// ================================================
// 🔹 FORM UTILITIES
// ================================================

function getFormData(formElement) {
  const formData = new FormData(formElement);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  return data;
}

function setFormData(formElement, data) {
  Object.keys(data).forEach(key => {
    const field = formElement.elements[key];
    if (field) {
      field.value = data[key];
    }
  });
}

function clearForm(formElement) {
  formElement.reset();
}

// ================================================
// 🔹 LOCAL STORAGE UTILITIES
// ================================================

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function removeUser() {
  localStorage.removeItem('user');
}

// ================================================
// 🔹 CHECK AUTHENTICATION
// ================================================

function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '/login';
  }
}

function redirectIfAuth() {
  if (isAuthenticated()) {
    window.location.href = '/dashboard';
  }
}

function initializeNavbar(pageTitle = 'Dashboard') {
  // Update page title in navbar
  const navPageTitleEl = document.getElementById('navPageTitle');
  if (navPageTitleEl) {
    navPageTitleEl.textContent = pageTitle;
  }

  // Get user from localStorage
  const user = getUser();
  if (!user) return;

  // Update navbar with user data
  const navUserNameEl = document.getElementById('navUserName');
  if (navUserNameEl) {
    navUserNameEl.textContent = user.name || 'User';
  }

  const navUserRoleEl = document.getElementById('navUserRole');
  if (navUserRoleEl) {
    const roleDisplay = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member';
    navUserRoleEl.textContent = roleDisplay;
  }

  const navUserInitialsEl = document.getElementById('navUserInitials');
  if (navUserInitialsEl) {
    const initials = user.name.split(' ').map(n => n[0]).toUpperCase().join('');
    navUserInitialsEl.textContent = initials || 'U';
  }
}
