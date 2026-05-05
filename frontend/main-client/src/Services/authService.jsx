import { USER_ENDPOINTS, apiRequest } from "../config/api";

/**
 * Store user email in localStorage for quick access
 */
const persistEmail = (email) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("email", JSON.stringify(email));
  window.localStorage.setItem("user", JSON.stringify(email));
};

/**
 * Clear user data from localStorage
 */
const clearPersistence = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("user");
};

/**
 * Normalize email format
 */
const normaliseEmail = (email = "") => email.trim().toLowerCase();

/**
 * Transform backend user response to match frontend format
 */
const transformUserData = (userData) => {
  return {
    id: userData._id,
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    isAdmin: Boolean(userData.isAdmin),
    cartList: userData.cartList || [],
    orderList: userData.orderList || [],
  };
};

/**
 * Login user
 * @param {Object} authDetail - { email, password }
 * @returns {Promise<Object>} User data
 */
const login = async (authDetail) => {
  const { email, password } = authDetail;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const userData = await apiRequest(USER_ENDPOINTS.LOGIN, {
      method: "POST",
      body: JSON.stringify({
        email: normaliseEmail(email),
        password,
      }),
    });

    const transformedUser = transformUserData(userData);
    persistEmail(transformedUser.email);

    return transformedUser;
  } catch (error) {
    throw new Error(error.message || "Invalid email or password");
  }
};

/**
 * Register new user
 * @param {Object} authDetail - { name, email, password }
 * @returns {Promise<Object>} User data
 */
const register = async (authDetail) => {
  const { name, email, password } = authDetail;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const userData = await apiRequest(USER_ENDPOINTS.REGISTER_USER, {
      method: "POST",
      body: JSON.stringify({
        name: name.trim(),
        email: normaliseEmail(email),
        password,
      }),
    });

    const transformedUser = transformUserData(userData);
    persistEmail(transformedUser.email);

    return transformedUser;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};

/**
 * Logout user
 * @returns {Promise<boolean>}
 */
const logout = async () => {
  try {
    await apiRequest(USER_ENDPOINTS.LOGOUT, {
      method: "POST",
    });
    clearPersistence();
    return true;
  } catch (error) {
    // Even if the request fails, clear local storage
    clearPersistence();
    throw new Error(error.message || "Logout failed");
  }
};

const authService = {
  login,
  register,
  logout,
};
export default authService;