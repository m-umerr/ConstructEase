import axios from 'axios';
import { supabase } from '@/lib/supabase';

// Create an axios instance
// Use environment variable for API URL or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Flag to use mock data instead of real API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || false;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (session) {
      // If using Supabase (legacy), this will be the JWT token from Supabase
      config.headers['Authorization'] = `Bearer ${session.access_token}`;
    } else {
      // Check localStorage for our Spring JWT token
      const springJwt = localStorage.getItem('edifice-jwt');
      if (springJwt) {
        config.headers['Authorization'] = `Bearer ${springJwt}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh or errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet, attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token (if using Supabase)
        const { data } = await supabase.auth.refreshSession();
        const newSession = data.session;

        if (newSession) {
          // Use the new token
          originalRequest.headers['Authorization'] = `Bearer ${newSession.access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Redirect to login
        window.location.href = '/auth';
      }
    }

    return Promise.reject(error);
  }
);

// Mock data for deployment without backend
const mockProjects = [
  {
    id: 1,
    name: "City Center Tower",
    description: "Downtown high-rise commercial building construction",
    projectNumber: "PRJ-2023-001",
    startDate: "2023-01-15",
    endDate: "2025-06-30",
    budgetAmount: 25000000.00,
    budgetSpent: 8750000.00,
    status: "IN_PROGRESS",
    locationAddress: "123 Main St",
    locationCity: "Metropolis",
    locationState: "CA",
    locationZip: "90001",
    locationCountry: "USA",
    completionPercentage: 35
  },
  {
    id: 2,
    name: "Riverfront Residences",
    description: "Luxury waterfront condominium complex",
    projectNumber: "PRJ-2023-002",
    startDate: "2023-03-10",
    endDate: "2024-11-20",
    budgetAmount: 18500000.00,
    budgetSpent: 9250000.00,
    status: "IN_PROGRESS",
    locationAddress: "456 River Dr",
    locationCity: "Riverside",
    locationState: "CA",
    locationZip: "92501",
    locationCountry: "USA",
    completionPercentage: 50
  },
  {
    id: 3,
    name: "Greenfield Hospital Expansion",
    description: "Medical facility expansion and renovation",
    projectNumber: "PRJ-2023-003",
    startDate: "2023-06-05",
    endDate: "2024-08-15",
    budgetAmount: 32000000.00,
    budgetSpent: 6400000.00,
    status: "IN_PROGRESS",
    locationAddress: "789 Health Blvd",
    locationCity: "Greenfield",
    locationState: "CA",
    locationZip: "93927",
    locationCountry: "USA",
    completionPercentage: 20
  }
];

const mockTasks = [
  {
    id: 1,
    title: "Foundation Planning",
    description: "Plan and design the building foundation",
    projectId: 1,
    priority: "HIGH",
    status: "COMPLETED",
    dueDate: "2023-02-15",
    startDate: "2023-01-20"
  },
  {
    id: 2,
    title: "Structural Framework",
    description: "Install main structural framework",
    projectId: 1,
    priority: "HIGH",
    status: "IN_PROGRESS",
    dueDate: "2023-09-30",
    startDate: "2023-07-01"
  },
  {
    id: 3,
    title: "Interior Design Planning",
    description: "Complete interior design specifications",
    projectId: 2,
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    dueDate: "2023-10-15",
    startDate: "2023-09-01"
  }
];

const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@edifice.com",
    firstName: "Admin",
    lastName: "User",
    jobTitle: "System Administrator",
    roles: ["ROLE_ADMIN"]
  },
  {
    id: 2,
    username: "manager",
    email: "manager@edifice.com",
    firstName: "Project",
    lastName: "Manager",
    jobTitle: "Senior Project Manager",
    roles: ["ROLE_PROJECT_MANAGER"]
  },
  {
    id: 3,
    username: "engineer",
    email: "engineer@edifice.com",
    firstName: "Senior",
    lastName: "Engineer",
    jobTitle: "Civil Engineer",
    roles: ["ROLE_ENGINEER"]
  }
];

// Authentication service with mock support
export const authService = {
  async login(username: string, password: string) {
    if (USE_MOCK_API) {
      // Mock login for deployment without backend
      const user = mockUsers.find(u => u.username === username);

      if (user && (password === 'admin123' || password === 'manager123' || password === 'engineer123')) {
        const token = "mock-jwt-token-" + Math.random().toString(36).substring(2);
        const userData = {
          token,
          type: "Bearer",
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles
        };

        localStorage.setItem('edifice-jwt', token);
        localStorage.setItem('edifice-user', JSON.stringify(userData));

        return userData;
      } else {
        throw new Error("Invalid username or password");
      }
    } else {
      // Real API call
      const response = await api.post('/auth/signin', { username, password });
      if (response.data.token) {
        localStorage.setItem('edifice-jwt', response.data.token);
        localStorage.setItem('edifice-user', JSON.stringify(response.data));
      }
      return response.data;
    }
  },

  async register(userData: any) {
    if (USE_MOCK_API) {
      // Simulate successful registration
      return { message: "User registered successfully!" };
    } else {
      return await api.post('/auth/signup', userData);
    }
  },

  logout() {
    localStorage.removeItem('edifice-jwt');
    localStorage.removeItem('edifice-user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('edifice-user');
    return user ? JSON.parse(user) : null;
  }
};

// Project service with mock support
export const projectService = {
  getAllProjects() {
    if (USE_MOCK_API) {
      return Promise.resolve({ data: mockProjects });
    }
    return api.get('/projects');
  },

  getProject(id: number) {
    if (USE_MOCK_API) {
      const project = mockProjects.find(p => p.id === id);
      return Promise.resolve({ data: project });
    }
    return api.get(`/projects/${id}`);
  },

  createProject(project: any) {
    if (USE_MOCK_API) {
      const newProject = {
        ...project,
        id: mockProjects.length + 1
      };
      mockProjects.push(newProject);
      return Promise.resolve({ data: newProject });
    }
    return api.post('/projects', project);
  },

  updateProject(id: number, project: any) {
    if (USE_MOCK_API) {
      const index = mockProjects.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProjects[index] = { ...mockProjects[index], ...project };
        return Promise.resolve({ data: mockProjects[index] });
      }
      return Promise.reject(new Error("Project not found"));
    }
    return api.put(`/projects/${id}`, project);
  },

  deleteProject(id: number) {
    if (USE_MOCK_API) {
      const index = mockProjects.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProjects.splice(index, 1);
        return Promise.resolve({ status: 204 });
      }
      return Promise.reject(new Error("Project not found"));
    }
    return api.delete(`/projects/${id}`);
  }
};

// Task service with mock support
export const taskService = {
  getAllTasks() {
    if (USE_MOCK_API) {
      return Promise.resolve({ data: mockTasks });
    }
    return api.get('/tasks');
  },

  getTask(id: number) {
    if (USE_MOCK_API) {
      const task = mockTasks.find(t => t.id === id);
      return Promise.resolve({ data: task });
    }
    return api.get(`/tasks/${id}`);
  },

  getTasksByProject(projectId: number) {
    if (USE_MOCK_API) {
      const tasks = mockTasks.filter(t => t.projectId === projectId);
      return Promise.resolve({ data: tasks });
    }
    return api.get(`/tasks/project/${projectId}`);
  },

  getTasksAssignedToUser(userId: number) {
    if (USE_MOCK_API) {
      // In the mock data, we don't track assigned users
      // so just return all tasks for demo purposes
      return Promise.resolve({ data: mockTasks });
    }
    return api.get(`/tasks/assigned/${userId}`);
  },

  createTask(task: any) {
    if (USE_MOCK_API) {
      const newTask = {
        ...task,
        id: mockTasks.length + 1
      };
      mockTasks.push(newTask);
      return Promise.resolve({ data: newTask });
    }
    return api.post('/tasks', task);
  },

  updateTask(id: number, task: any) {
    if (USE_MOCK_API) {
      const index = mockTasks.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTasks[index] = { ...mockTasks[index], ...task };
        return Promise.resolve({ data: mockTasks[index] });
      }
      return Promise.reject(new Error("Task not found"));
    }
    return api.put(`/tasks/${id}`, task);
  },

  deleteTask(id: number) {
    if (USE_MOCK_API) {
      const index = mockTasks.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTasks.splice(index, 1);
        return Promise.resolve({ status: 204 });
      }
      return Promise.reject(new Error("Task not found"));
    }
    return api.delete(`/tasks/${id}`);
  }
};

// Default export for convenience
export default api;
