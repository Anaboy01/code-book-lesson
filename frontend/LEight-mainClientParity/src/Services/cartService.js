import { CART_ENDPOINTS, apiRequest } from "../config/api";

const transformCartData = (cartData) => {
  const cartList = cartData.cartList || [];
  const total = Number(
    cartList.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)
  );

  return {
    cartList,
    total,
  };
};

const getCurrentEmail = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return JSON.parse(window.localStorage.getItem("email") || "null");
};

const fetchCurrentCartRecord = async () => {
  const email = getCurrentEmail();
  if (!email) {
    return null;
  }

  const records = await apiRequest(
    `${CART_ENDPOINTS.GET_USER_CART}?email=${encodeURIComponent(email)}`
  );
  return records[0] || null;
};

const saveCartRecord = async (record) => {
  if (!record.id) {
    return apiRequest(CART_ENDPOINTS.ADD_TO_CART, {
      method: "POST",
      body: JSON.stringify(record),
    });
  }

  return apiRequest(`${CART_ENDPOINTS.ADD_TO_CART}/${record.id}`, {
    method: "PUT",
    body: JSON.stringify(record),
  });
};

const getUserCart = async () => {
  try {
    const record = await fetchCurrentCartRecord();
    if (!record) {
      return { cartList: [], total: 0 };
    }
    return transformCartData(record);
  } catch (error) {
    throw new Error(error.message || "Failed to fetch cart");
  }
};

const addToCartAPI = async (product) => {
  if (!product || typeof product.id === "undefined") {
    throw new Error("Invalid product");
  }

  try {
    const email = getCurrentEmail();
    if (!email) {
      throw new Error("Please login to add items");
    }
    const record = (await fetchCurrentCartRecord()) || { email, cartList: [] };
    const exists = record.cartList.some((item) => item.id === product.id);
    if (!exists) {
      record.cartList = [...record.cartList, product];
    }
    const saved = await saveCartRecord(record);
    return transformCartData(saved);
  } catch (error) {
    throw new Error(error.message || "Failed to add item to cart");
  }
};

const removeFromCartAPI = async (product) => {
  const productId = typeof product === "number" ? product : product?.id;
  if (typeof productId === "undefined") {
    throw new Error("Invalid product");
  }

  try {
    const record = await fetchCurrentCartRecord();
    if (!record) {
      return { cartList: [], total: 0 };
    }
    record.cartList = record.cartList.filter((item) => item.id !== productId);
    const saved = await saveCartRecord(record);
    return transformCartData(saved);
  } catch (error) {
    throw new Error(error.message || "Failed to remove item from cart");
  }
};

const clearCartAPI = async () => {
  try {
    const record = await fetchCurrentCartRecord();
    if (!record) {
      return { cartList: [], total: 0 };
    }
    const saved = await saveCartRecord({ ...record, cartList: [] });
    return transformCartData(saved);
  } catch (error) {
    throw new Error(error.message || "Failed to clear cart");
  }
};

const cartService = {
  getUserCart,
  addToCartAPI,
  removeFromCartAPI,
  clearCartAPI,
};

export default cartService;
