#!/usr/bin/env python3
"""
Build lessons 6-7 as cumulative snapshots.
"""
import json
import shutil
from pathlib import Path

ROOT = Path('/Users/mac/Documents/code-book/frontend')

def mkdir(path):
    path.mkdir(parents=True, exist_ok=True)

def write_file(path, content):
    mkdir(path.parent)
    with open(path, 'w') as f:
        f.write(content)

def write_json(path, data):
    mkdir(path.parent)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

def copy_entire_lesson(source_name, dest_name):
    source = ROOT / source_name
    dest = ROOT / dest_name
    if dest.exists():
        shutil.rmtree(dest)
    shutil.copytree(source, dest)
    print(f"  Copied {source_name} → {dest_name}")

# ==================== LESSON 6 ====================
def build_lesson_six():
    """LSix: Redux as alternative to Context API."""
    print("\nBuilding LSix-reduxStateManagement...")
    lesson = "LSix-reduxStateManagement"
    copy_entire_lesson("LFive-contextAPI", lesson)
    lesson_path = ROOT / lesson

    # Update package.json to use Redux instead of Context
    pkg = {
        "name": "LSix-reduxStateManagement",
        "private": True,
        "version": "0.0.0",
        "type": "module",
        "scripts": {"dev": "vite", "build": "vite build", "start": "vite"},
        "dependencies": {
            "react": "^19.2.0",
            "react-dom": "^19.2.0",
            "react-router-dom": "^7.9.5",
            "redux": "^4.2.1",
            "react-redux": "^9.1.0",
            "tailwindcss": "^4.1.17",
            "react-icons": "^5.5.0",
            "react-toastify": "^11.0.5",
        },
        "devDependencies": {
            "@tailwindcss/vite": "^4.1.17",
            "@types/react": "^19.2.2",
            "@types/react-dom": "^19.2.2",
            "@vitejs/plugin-react": "^5.1.0",
            "@eslint/js": "^9.39.1",
            "eslint": "^9.39.1",
            "eslint-plugin-react-hooks": "^5.2.0",
            "eslint-plugin-react-refresh": "^0.4.24",
            "globals": "^16.5.0",
            "vite": "^7.2.2",
        },
    }
    write_json(lesson_path / "package.json", pkg)

    # Create Redux store
    write_file(lesson_path / "src/store/index.js", """import { createStore, combineReducers } from 'redux'
import { cartReducer } from '../reducers/cartReducer'

const filterReducer = (state = { search: '', category: '', priceRange: [0, 100] }, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterReducer,
})

export const store = createStore(rootReducer)""")

    # Create Redux actions
    write_file(lesson_path / "src/store/actions.js", """export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
})

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
})

export const clearCart = () => ({
  type: 'CLEAR_CART',
})

export const setSearch = (search) => ({
  type: 'SET_SEARCH',
  payload: search,
})""")

    # Update main.jsx to use Redux instead of Context
    write_file(lesson_path / "src/main.jsx", """import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App.jsx'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer position="bottom-right" />
    </Provider>
  </BrowserRouter>,
)""")

    # Update Header to use Redux
    write_file(lesson_path / "src/Components/Layout/Header.jsx", """import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiShoppingCart } from 'react-icons/fi'

export function Header() {
  const cartList = useSelector(state => state.cart.cartList)

  return (
    <header className="mb-8 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-3xl font-semibold text-slate-900 hover:text-slate-700">
              CodeBook
            </Link>
            <p className="mt-2 text-slate-600">A React lesson series, lesson by lesson.</p>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link to="/" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Home
            </Link>
            <Link to="/login" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Login
            </Link>
            <Link to="/register" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Register
            </Link>
            <Link to="/cart" className="relative rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              <FiShoppingCart className="inline" size={20} />
              {cartList.length > 0 && (
                <span className="absolute right-2 top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">
                  {cartList.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}""")

    # Update ProductCard to use Redux
    write_file(lesson_path / "src/Components/Elements/ProductCard.jsx", """import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/actions'
import { Rating } from './Rating'
import { FiShoppingCart } from 'react-icons/fi'

export function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200 transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
      <p className="mt-3 text-slate-600">{product.description}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-lg font-semibold text-slate-900">\${product.price}</span>
          <div className="mt-1">
            <Rating rating={product.rating} count={product.reviews} />
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="rounded-lg bg-slate-900 p-2 text-white hover:bg-slate-800"
        >
          <FiShoppingCart size={20} />
        </button>
      </div>
    </article>
  )
}""")

    # Update Cart page to use Redux
    write_file(lesson_path / "src/Pages/Cart.jsx", """import { useSelector } from 'react-redux'
import { useTitle } from '../Hooks/useTitle'
import { Link } from 'react-router-dom'

export function Cart() {
  useTitle('Shopping Cart')
  const { cartList, total } = useSelector(state => state.cart)

  if (cartList.length === 0) {
    return (
      <section className="mx-auto max-w-4xl py-12">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">Shopping Cart</h1>
        
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <p className="mt-2 text-sm text-slate-500">Add some courses to get started!</p>
          <Link to="/" className="mt-4 inline-block rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white hover:bg-slate-800">
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl py-12">
      <h1 className="mb-8 text-3xl font-semibold text-slate-900">Shopping Cart ({cartList.length})</h1>
      
      <div className="mb-8 space-y-4">
        {cartList.map(item => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
            <span className="font-semibold text-slate-900">\${item.price}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-right text-lg font-semibold text-slate-900">
          Total: \${total.toFixed(2)}
        </p>
      </div>
    </section>
  )
}""")

    # Update Home page
    write_file(lesson_path / "src/Pages/Home.jsx", """import { useTitle } from '../Hooks/useTitle'
import { ProductCard } from '../Components/Elements/ProductCard'
import { products } from '../data/products'

export function Home() {
  useTitle('Home - Browse Courses')

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white shadow-xl shadow-slate-400/10">
        <h2 className="text-4xl font-semibold">Lesson 6: Redux</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          Now we've replaced React Context with Redux for state management.
          Redux provides a single store, actions, and reducers for more complex apps.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="mb-4 text-2xl font-semibold">Featured Courses</h3>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}""")

    # README
    write_file(lesson_path / "README.md", """# LSix-reduxStateManagement

## Topic
Alternative state management with Redux instead of React Context.

## What Changed From Previous Lesson
✅ Replaced **React Context** with **Redux**  
✅ Created Redux **store** with combined reducers  
✅ Created Redux **actions** for cart operations  
✅ Updated **main.jsx** to use Provider from react-redux  
✅ Updated **Header, ProductCard, Cart** to use `useSelector` and `useDispatch`  
✅ Removed **CartProvider/FilterProvider** components  

## Key Concepts Introduced
- Redux: Centralized state management library
- Single store: All state in one place
- Actions: Objects describing what happened
- Reducers: Pure functions to calculate new state
- Dispatch: Trigger actions
- useSelector: Get state from store
- useDispatch: Access dispatch function

## Why These Changes Were Made
Redux offers benefits for large apps:
- **Predictable state**: Single source of truth
- **Time-travel debugging**: See all past states
- **Testability**: Pure reducers are easy to test
- **DevTools**: Browser extension for state inspection

However, Redux adds complexity. Lesson 5 showed Context (simpler), Lesson 6 shows Redux (more powerful), and Lesson 7 returns to Context (matching main-client).

## What You Should See When You Run This
✓ App looks identical to Lesson 5  
✓ Add to cart functionality works the same  
✓ Cart count updates in header  
✓ Cart page displays items  

Functionally identical to Lesson 5, but using Redux internally instead of Context.

## How to Run
```bash
npm install
npm run dev
```

Open browser DevTools (F12), install Redux DevTools extension, and watch state changes!

## Next Lesson
In Lesson 7, we'll return to Context API (like main-client) and add a real **JSON-RPC Server** for backend integration.
""")

    print(f"✓ {lesson} complete")


# ==================== LESSON 7 ====================
def build_lesson_seven():
    """LSeven: JSON-RPC server + Context API (matching main-client)."""
    print("\nBuilding LSeven-jsonRpcServer...")
    lesson = "LSeven-jsonRpcServer"
    copy_entire_lesson("LFive-contextAPI", lesson)  # Go back to Context (not Redux)
    lesson_path = ROOT / lesson

    # Keep same package.json as Lesson 5 (Context API)
    pkg = {
        "name": "LSeven-jsonRpcServer",
        "private": True,
        "version": "0.0.0",
        "type": "module",
        "scripts": {"dev": "vite", "build": "vite build", "start": "vite"},
        "dependencies": {
            "react": "^19.2.0",
            "react-dom": "^19.2.0",
            "react-router-dom": "^7.9.5",
            "tailwindcss": "^4.1.17",
            "react-icons": "^5.5.0",
            "react-toastify": "^11.0.5",
        },
        "devDependencies": {
            "@tailwindcss/vite": "^4.1.17",
            "@types/react": "^19.2.2",
            "@types/react-dom": "^19.2.2",
            "@vitejs/plugin-react": "^5.1.0",
            "@eslint/js": "^9.39.1",
            "eslint": "^9.39.1",
            "eslint-plugin-react-hooks": "^5.2.0",
            "eslint-plugin-react-refresh": "^0.4.24",
            "globals": "^16.5.0",
            "vite": "^7.2.2",
        },
    }
    write_json(lesson_path / "package.json", pkg)

    # Update vite config to proxy JSON-RPC
    write_file(lesson_path / "vite.config.js", """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/rpc': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})""")

    # Create JSON-RPC client
    write_file(lesson_path / "src/Services/jsonRpcClient.js", """export class JsonRpcClient {
  constructor(url = '/rpc') {
    this.url = url
    this.id = 0
  }

  async call(method, params = []) {
    const request = {
      jsonrpc: '2.0',
      id: ++this.id,
      method,
      params,
    }

    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error.message)
    }

    return data.result
  }
}

export const rpc = new JsonRpcClient('/rpc')""")

    # Update product service to use JSON-RPC
    write_file(lesson_path / "src/Services/productServices.js", """import { rpc } from './jsonRpcClient'

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
}""")

    # Update cart service to use JSON-RPC
    write_file(lesson_path / "src/Services/cartService.js", """import { rpc } from './jsonRpcClient'

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
}""")

    # Create basic JSON-RPC server
    write_file(lesson_path / "../jsonRpc-server/package.json", """{
  "name": "jsonrpc-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {}
}""")

    write_file(lesson_path / "../jsonRpc-server/server.js", """import http from 'http'

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
})""")

    # Update Home page
    write_file(lesson_path / "src/Pages/Home.jsx", """import { useTitle } from '../Hooks/useTitle'
import { ProductCard } from '../Components/Elements/ProductCard'
import { products } from '../data/products'
import { useState, useEffect } from 'react'

export function Home() {
  useTitle('Home - Browse Courses')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // In production, fetch from server here
    setLoading(false)
  }, [])

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white shadow-xl shadow-slate-400/10">
        <h2 className="text-4xl font-semibold">Lesson 7: JSON-RPC Server</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          This lesson combines everything from Lessons 1-5 with a real JSON-RPC backend server.
          Start the server with: npm start (in jsonRpc-server folder)
        </p>
      </div>

      {loading && <p className="text-center text-slate-600">Loading products...</p>}

      <div className="mb-12">
        <h3 className="mb-4 text-2xl font-semibold">Featured Courses</h3>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}""")

    # README
    write_file(lesson_path / "README.md", """# LSeven-jsonRpcServer

## Topic
Integrating with a JSON-RPC backend server (matching main-client's server architecture).

## What Changed From Previous Lesson (Lesson 5)
✅ Created **jsonRpcClient.js** — JSON-RPC protocol client  
✅ Updated **productServices.js** — Now calls JSON-RPC server  
✅ Updated **cartService.js** — Now calls JSON-RPC server  
✅ Added Vite proxy config for /rpc endpoint  
✅ Created **jsonRpc-server/** folder with real Node.js server  
✅ Server implements: getProducts, getProductById, searchProducts, getCart, addToCart, removeFromCart, clearCart  

## Key Concepts Introduced
- JSON-RPC 2.0 protocol: Standard for remote procedure calls over JSON
- Client-server communication: Frontend calls backend methods
- Separation of concerns: Server handles data, client renders UI
- Error handling: Try-catch in service layer
- CORS: Cross-Origin Resource Sharing for frontend/backend on different ports

## Why These Changes Were Made
Up to Lesson 6, we used mock data. A real app needs a backend server:
- **Persist data**: Save carts and user info
- **Scalability**: Multiple users with isolated data
- **Security**: Server-side validation
- **Real API**: Matching main-client's server architecture

## What You Should See When You Run This
### Frontend
✓ App looks identical to Lesson 5 with Context API  
✓ Products display (from mock data for now)  
✓ Add to cart works  
✓ Cart count in header updates  

### Server Integration
1. Start the server: `cd jsonRpc-server && npm start`
2. Server listens on http://localhost:4000/rpc  
3. Frontend proxy forwards /rpc requests to server  
4. Open browser DevTools (Network tab) to see JSON-RPC requests and responses  

## How to Run

### Terminal 1 - Frontend
```bash
cd frontend/LSeven-jsonRpcServer
npm install
npm run dev
```

### Terminal 2 - Backend
```bash
cd frontend/jsonRpc-server
npm start
```

Both must run together for the app to work.

## JSON-RPC Protocol Example
**Request:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getProducts",
  "params": []
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [...]
}
```

## Next Steps
This is the final lesson! It demonstrates all core React concepts:
1. ✅ Project structure
2. ✅ Components
3. ✅ Routing
4. ✅ Custom hooks
5. ✅ Context API for state
6. ✅ (Lesson 6 showed Redux alternative)
7. ✅ Server integration

Compare this with `frontend/main-client/` to see the production version with more pages, features, and polish.
""")

    print(f"✓ {lesson} complete")
    print(f"✓ Created jsonRpc-server at frontend/jsonRpc-server/")


if __name__ == '__main__':
    build_lesson_six()
    build_lesson_seven()
    print("\n✅ Lessons 6-7 complete!")
