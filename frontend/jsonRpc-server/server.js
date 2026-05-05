import http from 'http'

const products = [
  { id: '1', title: 'React Fundamentals', description: 'Learn React basics and hooks.', price: 29, rating: 5, reviews: 124 },
  { id: '2', title: 'Modern JavaScript', description: 'Master ES6+ features.', price: 25, rating: 4, reviews: 98 },
  { id: '3', title: 'Design Systems', description: 'Build with Tailwind CSS.', price: 22, rating: 5, reviews: 156 },
  { id: '4', title: 'Performance', description: 'Optimize React apps.', price: 27, rating: 4, reviews: 67 },
  { id: '5', title: 'Testing Patterns', description: 'Write robust tests.', price: 24, rating: 5, reviews: 89 },
  { id: '6', title: 'State Management', description: 'Redux, Context, Zustand.', price: 28, rating: 4, reviews: 145 },
]

const carts = {} // userId -> { items: [], total: 0 }

function handleRpc(method, params) {
  switch (method) {
    case 'getProducts':
      return products

    case 'getProductById':
      return products.find(p => p.id === params[0])

    case 'searchProducts':
      const query = params[0].toLowerCase()
      return products.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )

    case 'getCart':
      const userId = params[0]
      return carts[userId]?.items || []

    case 'addToCart':
      const [userId2, product] = params
      if (!carts[userId2]) carts[userId2] = { items: [], total: 0 }
      carts[userId2].items.push(product)
      carts[userId2].total += product.price
      return carts[userId2]

    case 'removeFromCart':
      const [userId3, productId] = params
      if (carts[userId3]) {
        const item = carts[userId3].items.find(i => i.id === productId)
        if (item) {
          carts[userId3].total -= item.price
          carts[userId3].items = carts[userId3].items.filter(i => i.id !== productId)
        }
      }
      return carts[userId3] || { items: [], total: 0 }

    case 'clearCart':
      const userId4 = params[0]
      if (carts[userId4]) {
        carts[userId4].items = []
        carts[userId4].total = 0
      }
      return true

    default:
      throw new Error('Method not found: ' + method)
  }
}

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.url !== '/rpc' || req.method !== 'POST') {
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    try {
      const request = JSON.parse(body)
      const result = handleRpc(request.method, request.params)
      const response = {
        jsonrpc: '2.0',
        id: request.id,
        result,
      }
      res.writeHead(200)
      res.end(JSON.stringify(response))
    } catch (error) {
      res.writeHead(400)
      res.end(JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: { code: -32600, message: error.message },
      }))
    }
  })
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`JSON-RPC Server listening on http://localhost:\${PORT}/rpc`)
})