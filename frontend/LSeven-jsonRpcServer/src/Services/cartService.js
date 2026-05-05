import { rpc } from './jsonRpcClient'

export const cartService = {
  getCart: async (userId) => {
    try {
      return await rpc.call('getCart', [userId])
    } catch (error) {
      console.error('Error fetching cart:', error)
      return []
    }
  },

  addToCart: async (userId, product) => {
    try {
      return await rpc.call('addToCart', [userId, product])
    } catch (error) {
      console.error('Error adding to cart:', error)
      return product
    }
  },

  removeFromCart: async (userId, productId) => {
    try {
      return await rpc.call('removeFromCart', [userId, productId])
    } catch (error) {
      console.error('Error removing from cart:', error)
      return productId
    }
  },

  clearCart: async (userId) => {
    try {
      return await rpc.call('clearCart', [userId])
    } catch (error) {
      console.error('Error clearing cart:', error)
      return false
    }
  },
}