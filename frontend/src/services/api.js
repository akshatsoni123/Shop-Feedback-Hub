import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
    updatePassword: (data) => api.put('/auth/update-password', data)
};

// Admin APIs
export const adminAPI = {
    getDashboardStats: () => api.get('/admin/dashboard/stats'),
    createUser: (data) => api.post('/admin/users', data),
    getUsers: (params) => api.get('/admin/users', { params }),
    getUserById: (id) => api.get(`/admin/users/${id}`),
    createStore: (data) => api.post('/admin/stores', data),
    getStores: (params) => api.get('/admin/stores', { params })
};

// User APIs
export const userAPI = {
    getStores: (params) => api.get('/user/stores', { params }),
    submitRating: (data) => api.post('/user/ratings', data),
    updateRating: (data) => api.put('/user/ratings', data),
    getMyRatings: () => api.get('/user/ratings')
};

// Store Owner APIs
export const storeOwnerAPI = {
    getMyStore: () => api.get('/store-owner/store'),
    getDashboardStats: () => api.get('/store-owner/dashboard/stats'),
    getRatingUsers: (params) => api.get('/store-owner/ratings/users', { params })
};

export default api;
