import products from '../data/products.js'

const fakeRpcRequest = async (method, params) => {
  if (method === 'getProducts') {
    return products
  }
  if (method === 'getProductById') {
    return products.find((item) => item.id === params.id) ?? null
  }
  throw new Error('Method not found')
}

export const rpc = {
  getProducts: () => fakeRpcRequest('getProducts'),
  getProductById: (id) => fakeRpcRequest('getProductById', { id }),
}
