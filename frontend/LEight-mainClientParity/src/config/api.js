const BASE_URL = "http://localhost:3001";

const buildUrl = (path) => `${BASE_URL}${path}`;

export const USER_ENDPOINTS = {
  REGISTER_USER: buildUrl("/users"),
  REGISTER_ADMIN: buildUrl("/users"),
  LOGIN: buildUrl("/users"),
  LOGOUT: buildUrl("/logout"),
  LOGIN_STATUS: buildUrl("/login-status"),
  USER_PROFILE: buildUrl("/users"),
};

export const EBOOK_ENDPOINTS = {
  GET_ALL: buildUrl("/products"),
  GET_SINGLE: (id) => buildUrl(`/products/${id}`),
  CREATE: buildUrl("/products"),
  UPDATE: (id) => buildUrl(`/products/${id}`),
};

export const CART_ENDPOINTS = {
  GET_USER_CART: buildUrl("/carts"),
  ADD_TO_CART: buildUrl("/carts"),
  REMOVE_FROM_CART: buildUrl("/carts"),
  CLEAR_CART: buildUrl("/carts"),
};

export const ORDER_ENDPOINTS = {
  PLACE_ORDER: buildUrl("/orders"),
  GET_USER_ORDERS: buildUrl("/orders"),
  GET_ORDER_BY_ID: (id) => buildUrl(`/orders/${id}`),
};

export const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

