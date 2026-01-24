const API_BASE_URL = '/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  signup: (userData) => apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  getProfile: () => apiRequest('/auth/profile'),

  changePassword: (newPassword) => apiRequest('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ newPassword })
  }),

  logout: () => {
    // This would typically call an API endpoint to invalidate the token
    return Promise.resolve({ success: true });
  }
};

// Admin API
export const adminAPI = {
  // Staff management
  getStaff: (params = {}) => apiRequest(`/admin/staff?${new URLSearchParams(params)}`),
  createStaff: (staffData) => apiRequest('/admin/staff', {
    method: 'POST',
    body: JSON.stringify(staffData)
  }),
  updateStaff: (id, staffData) => apiRequest(`/admin/staff/${id}`, {
    method: 'PUT',
    body: JSON.stringify(staffData)
  }),
  deleteStaff: (id) => apiRequest(`/admin/staff/${id}`, {
    method: 'DELETE'
  }),

  // Student management
  getStudents: (params = {}) => apiRequest(`/admin/students?${new URLSearchParams(params)}`),
  createStudent: (studentData) => apiRequest('/admin/students', {
    method: 'POST',
    body: JSON.stringify(studentData)
  }),
  updateStudent: (id, studentData) => apiRequest(`/admin/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData)
  }),
  deleteStudent: (id) => apiRequest(`/admin/students/${id}`, {
    method: 'DELETE'
  }),

  // Course management
  getCourses: (params = {}) => apiRequest(`/admin/courses?${new URLSearchParams(params)}`),
  createCourse: (courseData) => apiRequest('/admin/courses', {
    method: 'POST',
    body: JSON.stringify(courseData)
  }),
  updateCourse: (id, courseData) => apiRequest(`/admin/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(courseData)
  }),
  deleteCourse: (id) => apiRequest(`/admin/courses/${id}`, {
    method: 'DELETE'
  })
};

// Staff API
export const staffAPI = {
  getStudents: (params = {}) => apiRequest(`/staff/students?${new URLSearchParams(params)}`),
  createStudent: (studentData) => apiRequest('/staff/students', {
    method: 'POST',
    body: JSON.stringify(studentData)
  }),
  updateStudent: (id, studentData) => apiRequest(`/staff/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData)
  }),
  deleteStudent: (id) => apiRequest(`/staff/students/${id}`, {
    method: 'DELETE'
  }),

  getAttendance: (params = {}) => apiRequest(`/staff/attendance?${new URLSearchParams(params)}`),
  markAttendance: (attendanceData) => apiRequest('/staff/attendance', {
    method: 'POST',
    body: JSON.stringify(attendanceData)
  }),

  getMarks: (params = {}) => apiRequest(`/staff/marks?${new URLSearchParams(params)}`),
  enterMarks: (marksData) => apiRequest('/staff/marks', {
    method: 'POST',
    body: JSON.stringify(marksData)
  })
};

// Student API
export const studentAPI = {
  getAttendance: (params = {}) => apiRequest(`/student/attendance?${new URLSearchParams(params)}`),
  getMarks: (params = {}) => apiRequest(`/student/marks?${new URLSearchParams(params)}`),
  getNotices: (params = {}) => apiRequest(`/student/notices?${new URLSearchParams(params)}`)
};

// Common API
export const commonAPI = {
  getDepartments: () => apiRequest('/departments'),
  getCourses: (params = {}) => apiRequest(`/courses?${new URLSearchParams(params)}`),
  getSubjects: (params = {}) => apiRequest(`/subjects?${new URLSearchParams(params)}`)
};

export default {
  auth: authAPI,
  admin: adminAPI,
  staff: staffAPI,
  student: studentAPI,
  common: commonAPI
};
