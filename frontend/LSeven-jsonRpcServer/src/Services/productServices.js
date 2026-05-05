import { rpc } from './jsonRpcClient'

export const productServices = {
  getProducts: async () => {
    try {
      return await rpc.call('getProducts')
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },

  getProductById: async (id) => {
    try {
      return await rpc.call('getProductById', [id])
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  },

  searchProducts: async (query) => {
    try {
      return await rpc.call('searchProducts', [query])
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  },
}