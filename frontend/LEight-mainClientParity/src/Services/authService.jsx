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
    const users = await apiRequest(
      `${USER_ENDPOINTS.LOGIN}?email=${encodeURIComponent(normaliseEmail(email))}`
    );
    const userData = users.find((user) => user.password === password);
    if (!userData) {
      throw new Error("Invalid email or password");
    }

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
    const normalisedEmail = normaliseEmail(email);
    const existingUsers = await apiRequest(
      `${USER_ENDPOINTS.REGISTER_USER}?email=${encodeURIComponent(normalisedEmail)}`
    );
    if (existingUsers.length > 0) {
      throw new Error("User already exists");
    }

    const userData = await apiRequest(USER_ENDPOINTS.REGISTER_USER, {
      method: "POST",
      body: JSON.stringify({
        name: name.trim(),
        email: normalisedEmail,
        password,
        isAdmin: false,
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
  clearPersistence();
  return true;
};

const authService = {
  login,
  register,
  logout,
};
export default authService;