// api-service.js - API Service for PlaceFlow Backend Integration

const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your backend URL

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== AUTHENTICATION APIs ====================

export const authAPI = {
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },
};

// ==================== STUDENT APIs ====================

export const studentAPI = {
  getProfile: async () => {
    return apiCall('/students/profile');
  },

  updateProfile: async (profileData) => {
    return apiCall('/students/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  getApplications: async () => {
    return apiCall('/students/applications');
  },

  applyToJob: async (jobId) => {
    return apiCall(`/jobs/${jobId}/apply`, {
      method: 'POST',
    });
  },

  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    return apiCall('/students/resume', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  },

  requestNOC: async (data) => {
    return apiCall('/students/noc', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ==================== JOB APIs ====================

export const jobAPI = {
  getActiveJobs: async () => {
    return apiCall('/jobs/active');
  },

  getJobById: async (jobId) => {
    return apiCall(`/jobs/${jobId}`);
  },

  createJob: async (jobData) => {
    return apiCall('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },
};

// ==================== RECRUITER APIs ====================

export const recruiterAPI = {
  getApplicants: async (jobId) => {
    return apiCall(`/jobs/${jobId}/applicants`);
  },

  shortlistCandidate: async (applicationId) => {
    return apiCall(`/applications/${applicationId}/shortlist`, {
      method: 'POST',
    });
  },

  getStats: async () => {
    return apiCall('/recruiters/stats');
  },
};

export default {
  authAPI,
  studentAPI,
  jobAPI,
  recruiterAPI,
};