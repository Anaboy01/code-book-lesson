import { ORDER_ENDPOINTS, apiRequest } from "../config/api";
import cartService from "./cartService";
import dataService from "./dataService";

const { getUserCart, clearCartAPI } = cartService;

/**
 * Transform backend order data to match frontend format
 */
const transformOrderData = (orderData) => {
  return {
    ...orderData,
    id: orderData.id,
    orderId: orderData.orderId || `ORD-${orderData.id}`,
    amount_paid: orderData.amount_paid || orderData.amountPaid,
    createdAt: orderData.createdAt || orderData.created_at,
  };
};

const placeOrder = async (cartItems) => {
  try {
    const user = await dataService.getUser();
    if (!user) {
      throw new Error("Please login to place order");
    }

    const cartData = await getUserCart();
    const activeItems = cartItems?.length ? cartItems : cartData.cartList;
    if (!activeItems.length) {
      throw new Error("Cart is empty");
    }

    const amount_paid = Number(
      activeItems.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)
    );
    const orderData = await apiRequest(ORDER_ENDPOINTS.PLACE_ORDER, {
      method: "POST",
      body: JSON.stringify({
        orderId: `ORD-${Date.now()}`,
        paymentId: `PAY-${Date.now()}`,
        quantity: activeItems.length,
        amount_paid,
        cartList: activeItems,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        createdAt: new Date().toISOString(),
      }),
    });

    await clearCartAPI();
    return transformOrderData(orderData);
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};

const getUserOrder = async () => {
  try {
    const user = await dataService.getUser();
    if (!user) {
      return [];
    }
    const orders = await apiRequest(
      `${ORDER_ENDPOINTS.GET_USER_ORDERS}?user.email=${encodeURIComponent(user.email)}`
    );

    return orders.map(transformOrderData);
  } catch (error) {
    throw new Error(error.message || "Failed to fetch orders");
  }
};

const getOrderById = async (orderId) => {
  if (!orderId) {
    throw new Error("order id is required");
  }

  try {
    const orderData = await apiRequest(ORDER_ENDPOINTS.GET_ORDER_BY_ID(orderId));

    return transformOrderData(orderData);
  } catch (error) {
    throw new Error(error.message || "Order not found");
  }
};

const orderService = {
  placeOrder,
  getUserOrder,
  getOrderById,
};

export default orderService;