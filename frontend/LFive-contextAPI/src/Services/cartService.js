export const cartService = {
  addToCart: async (product) => {
    // Mock: just return the product
    return product
  },
  removeFromCart: async (productId) => {
    // Mock: just return the id
    return productId
  },
  getCart: async () => {
    // Mock: return empty cart
    return []
  },
  clearCart: async () => {
    // Mock: return success
    return true
  },
}