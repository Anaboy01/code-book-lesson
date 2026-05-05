#!/usr/bin/env python3
"""
Build lessons 4-7 as cumulative snapshots.
Builds on lesson 3 (routing).
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

def clear_lesson_dir(lesson_name):
    lesson_path = ROOT / lesson_name
    if lesson_path.exists():
        shutil.rmtree(lesson_path)

# ==================== LESSON 4 ====================
def build_lesson_four():
    """LFour: Custom hooks for shared logic."""
    print("\nBuilding LFour-customHooks...")
    lesson = "LFour-customHooks"
    copy_entire_lesson("LThree-routingAndNavigation", lesson)
    lesson_path = ROOT / lesson

    # Update package.json
    pkg = {
        "name": "LFour-customHooks",
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

    # Create custom hook useTitle
    write_file(lesson_path / "src/Hooks/useTitle.js", """import { useEffect } from 'react'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - CodeBook` : 'CodeBook'
  }, [title])
}""")

    # Update each page to use useTitle
    write_file(lesson_path / "src/Pages/Home.jsx", """import { useTitle } from '../Hooks/useTitle'
import { ProductCard } from '../Components/Elements/ProductCard'
import { products } from '../data/products'

export function Home() {
  useTitle('Home - Browse Courses')

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white shadow-xl shadow-slate-400/10">
        <h2 className="text-4xl font-semibold">Lesson 4: Custom Hooks</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          Now we use the useTitle hook to set the browser title for each page.
          Check the browser tab title!
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

    write_file(lesson_path / "src/Pages/Login.jsx", """import { Link } from 'react-router-dom'
import { useTitle } from '../Hooks/useTitle'

export function Login() {
  useTitle('Sign In')

  return (
    <section className="mx-auto max-w-md py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Sign In</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          
          <button className="mt-6 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-800">
            Sign In
          </button>
        </form>
        
        <p className="mt-4 text-center text-slate-600">
          Don't have an account? {' '}
          <Link to="/register" className="font-semibold text-slate-900 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  )
}""")

    write_file(lesson_path / "src/Pages/Register.jsx", """import { Link } from 'react-router-dom'
import { useTitle } from '../Hooks/useTitle'

export function Register() {
  useTitle('Create Account')

  return (
    <section className="mx-auto max-w-md py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Create Account</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input 
              type="text" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          
          <button className="mt-6 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-800">
            Create Account
          </button>
        </form>
        
        <p className="mt-4 text-center text-slate-600">
          Already have an account? {' '}
          <Link to="/login" className="font-semibold text-slate-900 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  )
}""")

    write_file(lesson_path / "src/Pages/Cart.jsx", """import { useTitle } from '../Hooks/useTitle'

export function Cart() {
  useTitle('Shopping Cart')

  return (
    <section className="mx-auto max-w-4xl py-12">
      <h1 className="mb-8 text-3xl font-semibold text-slate-900">Shopping Cart</h1>
      
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="text-center text-slate-600">Your cart is empty.</p>
        <p className="mt-2 text-center text-sm text-slate-500">Add some courses to get started!</p>
      </div>
    </section>
  )
}""")

    # README
    write_file(lesson_path / "README.md", """# LFour-customHooks

## Topic
Creating custom hooks to extract and reuse logic across components.

## What Changed From Previous Lesson
✅ Created **useTitle** custom hook in `src/Hooks/useTitle.js`  
✅ Updated **Home, Login, Register, Cart** pages to call `useTitle()`  
✅ Check browser tab title—it now changes when navigating pages!  

## Key Concepts Introduced
- Custom hooks: functions that call other hooks and return state/functions
- `useEffect` dependency arrays
- Hook naming convention (prefix with "use")
- Extracting repeated logic into reusable hooks

## Why These Changes Were Made
Each page had similar code to set the document title. By creating `useTitle`, we:
- Avoid code duplication
- Make title changes consistent and maintainable
- Demonstrate hook composition (useEffect inside a custom hook)
- Prepare for more complex hooks in future lessons

## What You Should See When You Run This
✓ Visit the home page → browser tab says "Home - Browse Courses - CodeBook"  
✓ Click "Login" → tab says "Sign In - CodeBook"  
✓ Click "Create Account" → tab says "Create Account - CodeBook"  
✓ Click "Cart" → tab says "Shopping Cart - CodeBook"  
✓ Click "Home" → tab updates back  

The hook is small but demonstrates the power of extracting logic.

## How to Run
```bash
npm install
npm run dev
```

Watch the browser tab title change as you navigate.

## Next Lesson
In Lesson 5, we'll add **React Context** to manage global state (like a shopping cart that persists across pages).
""")

    print(f"✓ {lesson} complete")


# ==================== LESSON 5 ====================
def build_lesson_five():
    """LFive: Context API for global state (Cart, Filter)."""
    print("\nBuilding LFive-contextAPI...")
    lesson = "LFive-contextAPI"
    copy_entire_lesson("LFour-customHooks", lesson)
    lesson_path = ROOT / lesson

    # Update package.json
    pkg = {
        "name": "LFive-contextAPI",
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

    # Create cart reducer
    write_file(lesson_path / "src/reducers/cartReducer.js", """export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, cartList: action.payload, loading: false }
    case 'ADD_TO_CART':
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
        total: state.total + action.payload.price,
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartList: state.cartList.filter(item => item.id !== action.payload),
        total: state.total - (state.cartList.find(i => i.id === action.payload)?.price || 0),
      }
    case 'CLEAR_CART':
      return { cartList: [], total: 0, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}""")

    # Create CartContext
    write_file(lesson_path / "src/context/CartContext.jsx", """import { createContext, useReducer } from 'react'
import { cartReducer } from '../reducers/cartReducer'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const initialState = { cartList: [], total: 0, loading: false }
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}""")

    # Create FilterContext
    write_file(lesson_path / "src/context/FilterContext.jsx", """import { createContext, useReducer } from 'react'

export const FilterContext = createContext()

const initialState = {
  search: '',
  category: '',
  priceRange: [0, 100],
  sortBy: 'name',
}

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload }
    case 'RESET_FILTERS':
      return initialState
    default:
      return state
  }
}

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  )
}""")

    # Create cart service (mock)
    write_file(lesson_path / "src/Services/cartService.js", """export const cartService = {
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
}""")

    # Update main.jsx to wrap with providers
    write_file(lesson_path / "src/main.jsx", """import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { FilterProvider } from './context/FilterContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <FilterProvider>
        <App />
        <ToastContainer position="bottom-right" />
      </FilterProvider>
    </CartProvider>
  </BrowserRouter>,
)""")

    # Update Cart page to show context usage
    write_file(lesson_path / "src/Pages/Cart.jsx", """import { useContext } from 'react'
import { useTitle } from '../Hooks/useTitle'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

export function Cart() {
  useTitle('Shopping Cart')
  const { cartList, total } = useContext(CartContext)

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

    # Update Header to show cart count
    write_file(lesson_path / "src/Components/Layout/Header.jsx", """import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { FiShoppingCart } from 'react-icons/fi'

export function Header() {
  const { cartList } = useContext(CartContext)

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

    # Update ProductCard to use cart context
    write_file(lesson_path / "src/Components/Elements/ProductCard.jsx", """import { useContext } from 'react'
import { Rating } from './Rating'
import { CartContext } from '../../context/CartContext'
import { FiShoppingCart } from 'react-icons/fi'

export function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext)

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
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

    # Update Home page
    write_file(lesson_path / "src/Pages/Home.jsx", """import { useTitle } from '../Hooks/useTitle'
import { ProductCard } from '../Components/Elements/ProductCard'
import { products } from '../data/products'

export function Home() {
  useTitle('Home - Browse Courses')

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white shadow-xl shadow-slate-400/10">
        <h2 className="text-4xl font-semibold">Lesson 5: Context API</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          Now we use React Context to manage cart state globally.
          Click "Add to Cart" (cart icon) and watch the cart count in the header update!
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

    # Add missing react-icons import to Header
    write_file(lesson_path / "src/Components/Layout/Footer.jsx", """export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-slate-600">
        <p>&copy; 2024 CodeBook. All rights reserved.</p>
        <p className="mt-2 text-sm">Learning React, lesson by lesson.</p>
      </div>
    </footer>
  )
}""")

    # README
    write_file(lesson_path / "README.md", """# LFive-contextAPI

## Topic
Managing global state with React Context API and useReducer.

## What Changed From Previous Lesson
✅ Created **CartContext** with CartProvider  
✅ Created **FilterContext** with FilterProvider  
✅ Created **cartReducer** to manage cart actions  
✅ Wrapped app in providers in main.jsx  
✅ Updated **Header** to show cart item count  
✅ Updated **ProductCard** with "Add to Cart" button  
✅ Updated **Cart page** to display cart contents and total  
✅ Added **react-toastify** for notifications (used in later lessons)  
✅ Created **cartService** (mock for now)  

## Key Concepts Introduced
- React Context: Create and provide global state
- useReducer: Complex state logic management
- Provider pattern: Wrap components to make context available
- useContext: Consume context in components
- Dispatch pattern: Trigger state changes with actions

## Why These Changes Were Made
Global state (like a shopping cart) needs to be accessible from many components:
- Header (to show cart count)
- ProductCard (to add items)
- Cart page (to display contents)

Without Context, we'd have to "prop drill"—pass cart state down through many intermediate components. Context centralizes state and makes it available to any component that needs it.

## What You Should See When You Run This
✓ Header shows a shopping cart icon with a **red badge** showing cart count  
✓ Click the cart icon in product cards → "Add to Cart"  
✓ Watch the cart count in header **update in real-time**  
✓ Navigate to /cart → see all items you added with total price  
✓ Cart persists while you navigate (because it's in context)  

The app now has **functional global state**!

## How to Run
```bash
npm install
npm run dev
```

Add items to the cart and navigate around to see state persist.

## Next Lesson
In Lesson 6, we'll show an alternative to Context: **Redux state management**.
""")

    print(f"✓ {lesson} complete")


if __name__ == '__main__':
    build_lesson_four()
    build_lesson_five()
    print("\n✅ Lessons 4-5 complete!")
