import apiRequest from "../config/api";

export const getHome = async () => {
    // Fetch featured products
    return await apiRequest("/featured_products");
};

export const getHomeSlider = async () => {
    // Fetch slider products
    return await apiRequest("/products?best_seller=true");
};

export const getAllProducts = async () => {
    return await apiRequest("/products");
};
