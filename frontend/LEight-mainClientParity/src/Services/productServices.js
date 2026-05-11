import { EBOOK_ENDPOINTS, apiRequest } from "../config/api";

const normaliseSearch = (value = "") => value.toString().trim().toLowerCase();

const matchesSearch = (product, searchTerm) => {
  const normalised = normaliseSearch(searchTerm);
  if (!normalised) {
    return true;
  }

  const haystack = [
    product.name,
    product.overview,
    product.longDescription || product.long_description,
    product.price,
    product.id
  ]
    .filter(Boolean)
    .map((entry) => normaliseSearch(entry))
    .join(" ");

  return haystack.includes(normalised);
};

/**
 * Transform backend product data to match frontend format
 * Handles both snake_case and camelCase field names
 */
const transformProduct = (product) => {
  return {
    ...product,
    id: product.id || product._id, // Ensure id field is available
    long_description: product.longDescription || product.long_description,
    longDescription: product.longDescription || product.long_description,
    in_stock: product.inStock !== undefined ? product.inStock : (product.in_stock !== undefined ? product.in_stock : true),
    inStock: product.inStock !== undefined ? product.inStock : (product.in_stock !== undefined ? product.in_stock : true),
    best_seller: product.bestSeller !== undefined ? product.bestSeller : (product.best_seller !== undefined ? product.best_seller : false),
    bestSeller: product.bestSeller !== undefined ? product.bestSeller : (product.best_seller !== undefined ? product.best_seller : false),
  };
};

/**
 * Get all products with optional search filtering
 * @param {string} searchTerm - Optional search term to filter products
 * @returns {Promise<Array>} Array of products
 */
export async function getProductList(searchTerm = "") {
  try {
    const products = await apiRequest(EBOOK_ENDPOINTS.GET_ALL, {
      method: "GET",
    });

    const transformedProducts = products.map(transformProduct);

    // Client-side filtering for search
    if (searchTerm) {
      return transformedProducts.filter((product) => matchesSearch(product, searchTerm));
    }

    return transformedProducts;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch products");
  }
}

/**
 * Get a single product by ID
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProduct = async (id) => {
  try {
    const product = await apiRequest(EBOOK_ENDPOINTS.GET_SINGLE(id), {
      method: "GET",
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return transformProduct(product);
  } catch (error) {
    throw new Error(error.message || "Product not found");
  }
};

/**
 * Get featured products (best sellers)
 * @returns {Promise<Array>} Array of featured products
 */
export const getFeaturedList = async () => {
  try {
    const products = await apiRequest(EBOOK_ENDPOINTS.GET_ALL, {
      method: "GET",
    });

    // Support both legacy and json-server field names.
    const featured = products
      .filter((product) => product.bestSeller === true || product.best_seller === true)
      .map(transformProduct);

    return featured;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch featured products");
  }
};
