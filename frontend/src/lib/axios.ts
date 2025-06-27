import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Set jwt token here.
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (redirect to login?)
    }
    if (error.response?.status === 500) {
      // Handle server errors, redirect to general error page.
    }
    return Promise.reject(error);
  },
);

export default apiClient;
