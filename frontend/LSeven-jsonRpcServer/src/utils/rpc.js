const rpcRequest = async (method, params = {}) => {
  const response = await fetch('/rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })

  const payload = await response.json()
  if (payload.error) {
    throw new Error(payload.error.message || 'RPC error')
  }
  return payload.result
}

export const rpc = {
  getProducts: () => rpcRequest('getProducts'),
  getProductById: (id) => rpcRequest('getProductById', { id }),
}
