import { USER_ENDPOINTS, apiRequest } from "../config/api";

const transformUserData = (userData) => ({
  id: userData.id,
  _id: userData.id,
  name: userData.name,
  email: userData.email,
  isAdmin: Boolean(userData.isAdmin),
  cartList: userData.cartList || [],
  orderList: userData.orderList || [],
});

/**
 * Get current user profile
 * @returns {Promise<Object|null>} User data or null if not authenticated
 */
const getUser = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const email = JSON.parse(window.localStorage.getItem("email") || "null");
    if (!email) {
      return null;
    }
    const users = await apiRequest(
      `${USER_ENDPOINTS.USER_PROFILE}?email=${encodeURIComponent(email)}`
    );
    return users.length ? transformUserData(users[0]) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Check if user is logged in
 * @returns {Promise<boolean>} True if logged in, false otherwise
 */
const checkLoggingStatus = async () => {
  if (typeof window === "undefined") {
    return false;
  }

  const email = JSON.parse(window.localStorage.getItem("email") || "null");
  return Boolean(email);
};

const dataService = {
  getUser,
  checkLoggingStatus,
};

export default dataService;