import { createServer } from 'http'

const products = [
  { id: '1', title: 'React Fundamentals', description: 'Build reusable UI components with React.', price: 29 },
  { id: '2', title: 'Modern JavaScript', description: 'Explore the latest JavaScript features and syntax.', price: 25 },
  { id: '3', title: 'Design Systems', description: 'Create consistent UI systems using utility classes.', price: 22 },
  { id: '4', title: 'Performance Patterns', description: 'Learn how to keep component rendering fast.', price: 27 },
]

const methods = {
  getProducts: () => products,
  getProductById: ({ id }) => products.find((item) => item.id === id) ?? null,
}

const server = createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/rpc') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  let body = ''
  for await (const chunk of req) {
    body += chunk
  }

  try {
    const payload = JSON.parse(body)
    const result = methods[payload.method]?.(payload.params)
    const response = {
      jsonrpc: '2.0',
      id: payload.id ?? null,
      result: result ?? null,
    }

    if (result === undefined) {
      response.error = { code: -32601, message: 'Method not found' }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(response))
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: error.message }))
  }
})

server.listen(4000, () => {
  console.log('JSON-RPC server running at http://localhost:4000/rpc')
})
