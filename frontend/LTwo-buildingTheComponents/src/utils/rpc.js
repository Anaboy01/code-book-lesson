import products from '../data/products.js'

const fakeRpcRequest = (method, params) => {
  if (method === 'getProducts') {
    return Promise.resolve(products)
  }
  if (method === 'getProductById') {
    return Promise.resolve(products.find((item) => item.id === params.id) ?? null)
  }
  return Promise.reject(new Error('Method not found'))
}

export const rpc = {
  getProducts: () => fakeRpcRequest('getProducts'),
  getProductById: (id) => fakeRpcRequest('getProductById', { id }),
}
