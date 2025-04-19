import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (userData: any) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth/me"),
};

// Product services
export const productService = {
  getAll: () => api.get("/products"),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post("/products", data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Service services
export const serviceService = {
  getAll: () => api.get("/services"),
  getById: (id: string) => api.get(`/services/${id}`),
  create: (data: any) => api.post("/services", data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

// Course services
export const courseService = {
  getAll: () => api.get("/courses"),
  getById: (id: string) => api.get(`/courses/${id}`),
  create: (data: any) => api.post("/courses", data),
  update: (id: string, data: any) => api.put(`/courses/${id}`, data),
  delete: (id: string) => api.delete(`/courses/${id}`),
};

// Blog services
export const blogService = {
  getAll: () => api.get("/blogs"),
  getBySlug: (slug: string) => api.get(`/blogs/${slug}`),
  create: (data: any) => api.post("/blogs", data),
  update: (slug: string, data: any) => api.put(`/blogs/${slug}`, data),
  delete: (slug: string) => api.delete(`/blogs/${slug}`),
};

// Job application services
export const jobApplicationService = {
  getAll: () => api.get("/applications"),
  getById: (id: string) => api.get(`/applications/${id}`),
  create: (data: any) => api.post("/applications", data),
  update: (id: string, data: any) => api.put(`/applications/${id}`, data),
  delete: (id: string) => api.delete(`/applications/${id}`),
};

export const settingsService = {
  get: () => api.get("/settings"),
  update: (data: any) => api.put("/settings", data),
};

export default api;
