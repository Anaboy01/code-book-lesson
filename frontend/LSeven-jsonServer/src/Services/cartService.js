import apiRequest from "../config/api";

// Cart service for API-based cart operations
// In this lesson, cart still uses Context API (localStorage)
// In a full backend implementation, cart would be saved per user

export const saveCart = async (email, cartData) => {
    // Save user's cart to the backend
    try {
        return await apiRequest("/carts", {
            method: "POST",
            body: JSON.stringify({
                email,
                items: cartData.cartList,
                total: cartData.total,
                updatedAt: new Date().toISOString()
            }),
        });
    } catch (error) {
        console.error("Failed to save cart:", error);
        throw error;
    }
};

export const getCart = async (email) => {
    // Retrieve user's cart from the backend
    try {
        const carts = await apiRequest(`/carts?email=${email}`);
        return carts[0] || null;
    } catch (error) {
        console.error("Failed to retrieve cart:", error);
        throw error;
    }
};
