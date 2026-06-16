/**
 * API Configuration
 * Centralized configuration for backend API endpoints
 */

import axios from 'axios';

// Base URL configuration
// import.meta.env.DEV is true when running in development mode (npm run dev)
// import.meta.env.PROD is true when building for production (npm run build)
const getBaseURL = () => {
  // In development: use relative URL so Vite proxy forwards to backend
  if (import.meta.env.DEV) {
    return '/api';
  }
  // In production: use full URL or environment variable
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
};

// Helper function to build API endpoints
const api = (path) => {
  const base = getBaseURL();
  return base.endsWith('/') ? `${base}${path}` : `${base}/${path}`;
};

// User/Auth endpoints
export const USER_ENDPOINTS = {
  REGISTER_USER: api('users/registerUser'),
  REGISTER_ADMIN: api('users/registerAdmin'),
  LOGIN: api('users/login'),
  LOGOUT: api('users/logOut'),
  LOGIN_STATUS: api('users/loginStatus'),
  USER_PROFILE: api('users/UserProfile'),
};

// Ebook/Product endpoints
export const EBOOK_ENDPOINTS = {
  GET_ALL: api('ebook/getAllEbook'),
  GET_SINGLE: (id) => api(`ebook/singleEbook/${id}`),
  CREATE: api('ebook/createEbook'),
  UPDATE: (id) => api(`ebook/updateEbook/${id}`),
};

// Cart endpoints
export const CART_ENDPOINTS = {
  GET_USER_CART: api('cart/getUserCart'),
  ADD_TO_CART: api('cart/addToCart'),
  REMOVE_FROM_CART: api('cart/removeFromCart'),
  CLEAR_CART: api('cart/clearCart'),
};

// Order endpoints
export const ORDER_ENDPOINTS = {
  PLACE_ORDER: api('order/placeOrder'),
  GET_USER_ORDERS: api('order/getUserOrders'),
  GET_ORDER_BY_ID: (id) => api(`order/getOrderById/${id}`),
};

// API configuration for axios requests
export const API_CONFIG = {
  withCredentials: true, // Required for httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
};

export const apiClient = axios.create(API_CONFIG);

/**
 * Helper function to make API requests
 */
export const apiRequest = async (url, options = {}) => {
  const { method = 'GET', body, headers, ...rest } = options;

  const config = {
    url,
    method,
    headers: {
      ...API_CONFIG.headers,
      ...headers,
    },
    ...rest,
  };

  if (body !== undefined) {
    config.data = typeof body === 'string' ? JSON.parse(body) : body;
  }

  try {
    const response = await apiClient.request(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const message =
          error.response.data?.message || `HTTP error! status: ${error.response.status}`;
        throw new Error(message);
      }

      if (error.request) {
        throw new Error(
          'Unable to connect to server. Please make sure the backend server is running on port 3001.'
        );
      }
    }

    throw error;
  }
};

