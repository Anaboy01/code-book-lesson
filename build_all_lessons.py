#!/usr/bin/env python3
"""
Build all React lesson series as cumulative snapshots.
Each lesson is a COMPLETE working app with prior lessons' features + new concept.
"""
import json
import shutil
from pathlib import Path

ROOT = Path('/Users/mac/Documents/code-book/frontend')

def mkdir(path):
    """Create directory."""
    path.mkdir(parents=True, exist_ok=True)

def write_file(path, content):
    """Write file with automatic directory creation."""
    mkdir(path.parent)
    with open(path, 'w') as f:
        f.write(content)

def write_json(path, data):
    """Write JSON file."""
    mkdir(path.parent)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

def copy_entire_lesson(source_name, dest_name):
    """Copy entire lesson folder as base for next lesson."""
    source = ROOT / source_name
    dest = ROOT / dest_name
    if dest.exists():
        shutil.rmtree(dest)
    shutil.copytree(source, dest)
    print(f"  Copied {source_name} → {dest_name}")

def clear_lesson_dir(lesson_name):
    """Remove existing lesson folder entirely."""
    lesson_path = ROOT / lesson_name
    if lesson_path.exists():
        shutil.rmtree(lesson_path)
    print(f"  Cleared {lesson_name}")

# ==================== LESSON 1 ====================
def build_lesson_one():
    """LOne: Basic project structure with home page."""
    print("\nBuilding LOne-structuringTheProjectDirectory...")
    lesson = "LOne-structuringTheProjectDirectory"
    clear_lesson_dir(lesson)
    lesson_path = ROOT / lesson

    # package.json
    pkg = {
        "name": "LOne-structuringTheProjectDirectory",
        "private": True,
        "version": "0.0.0",
        "type": "module",
        "scripts": {"dev": "vite", "build": "vite build", "start": "vite"},
        "dependencies": {
            "react": "^19.2.0",
            "react-dom": "^19.2.0",
            "tailwindcss": "^4.1.17",
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

    # Config files
    write_file(lesson_path / "index.html", """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeBook - React Lessons</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>""")

    write_file(lesson_path / "vite.config.js", """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})""")

    write_file(lesson_path / "src/index.css", """@import "tailwindcss";

@theme {
  --color-dark: #1e253b;
}
""")

    # Main entry
    write_file(lesson_path / "src/main.jsx", """import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />,
)""")

    # App component
    write_file(lesson_path / "src/App.jsx", """import { Header } from './Components/Layout/Header'
import { Home } from './Pages/Home'

export default function App() {
  return (
    <div className="App dark:bg-dark min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="px-4 py-8">
        <Home />
      </main>
    </div>
  )
}""")

    # Header component
    write_file(lesson_path / "src/Components/Layout/Header.jsx", """export function Header() {
  return (
    <header className="mb-8 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-slate-900">CodeBook</h1>
        <p className="mt-2 text-slate-600">A React lesson series, lesson by lesson.</p>
      </div>
    </header>
  )
}""")

    # Home page
    write_file(lesson_path / "src/Pages/Home.jsx", """import { ProductCard } from '../Components/Elements/ProductCard'
import { products } from '../data/products'

export function Home() {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white shadow-xl shadow-slate-400/10">
        <h2 className="text-4xl font-semibold">Lesson 1: Project Structure</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          This lesson establishes the folder layout and the first working UI shell.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}""")

    # ProductCard component
    write_file(lesson_path / "src/Components/Elements/ProductCard.jsx", """export function ProductCard({ product }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200">
      <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
      <p className="mt-3 text-slate-600">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">\${product.price}</span>
      </div>
    </article>
  )
}""")

    # Data
    write_file(lesson_path / "src/data/products.js", """export const products = [
  { id: '1', title: 'React Fundamentals', description: 'Learn React basics and hooks.', price: 29 },
  { id: '2', title: 'Modern JavaScript', description: 'Master ES6+ features.', price: 25 },
  { id: '3', title: 'Design Systems', description: 'Build with Tailwind CSS.', price: 22 },
  { id: '4', title: 'Performance', description: 'Optimize React apps.', price: 27 },
]""")

    # README
    write_file(lesson_path / "README.md", """# LOne-structuringTheProjectDirectory

## Topic
File and folder structure for a React application.

## What Changed From Previous Lesson
This is the first lesson—it establishes the base structure for all following lessons.

## Key Concepts Introduced
- React project folder conventions
- Component-based architecture (Layout, Elements, Pages, Data)
- Vite build configuration
- Tailwind CSS global theme
- JSX syntax and component exports

## Why These Changes Were Made
This foundation organizes the project by concern:
- **Layout/**: Shared UI shells (Header, Footer)
- **Elements/**: Reusable pieces (ProductCard, Rating)
- **Pages/**: Full page views (Home, Login, Dashboard)
- **Data/**: Static or mock data
- **Services/**: (Added in later lessons) API calls
- **Context/**: (Added in later lessons) Global state
- **Hooks/**: (Added in later lessons) Shared logic

## What You Should See When You Run This
✓ A clean header with "CodeBook" title
✓ A hero section explaining Lesson 1
✓ Four product cards displayed in a responsive grid
✓ Professional styling with white cards, smooth shadows, proper spacing

No interactivity yet—this is the foundation.

## How to Run
```bash
npm install
npm run dev
```

Visit http://localhost:5173 to see the home page.

## Next Lesson
In Lesson 2, we'll add more components and pages (without routing yet) to build up the full UI library.
""")

    print(f"✓ {lesson} complete")


# ==================== LESSON 2 ====================
def build_lesson_two():
    """LTwo: Add all components and pages (no routing yet)."""
    print("\nBuilding LTwo-buildingTheComponents...")
    lesson = "LTwo-buildingTheComponents"
    copy_entire_lesson("LOne-structuringTheProjectDirectory", lesson)
    lesson_path = ROOT / lesson

    # Update package.json
    pkg = {
        "name": "LTwo-buildingTheComponents",
        "private": True,
        "version": "0.0.0",
        "type": "module",
        "scripts": {"dev": "vite", "build": "vite build", "start": "vite"},
        "dependencies": {
            "react": "^19.2.0",
            "react-dom": "^19.2.0",
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

    # Add Footer
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

    # Add Rating component
    write_file(lesson_path / "src/Components/Elements/Rating.jsx", """import { FaStar } from 'react-icons/fa'

export function Rating({ rating = 4, count = 10 }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? 'text-yellow-400' : 'text-slate-300'}
            size={14}
          />
        ))}
      </div>
      <span className="text-sm text-slate-600">({count})</span>
    </div>
  )
}""")

    # Add more components in ProductCard
    write_file(lesson_path / "src/Components/Elements/ProductCard.jsx", """import { Rating } from './Rating'

export function ProductCard({ product }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200 transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
      <p className="mt-3 text-slate-600">{product.description}</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-lg font-semibold text-slate-900">\${product.price}</span>
        <Rating rating={product.rating} count={product.reviews} />
      </div>
    </article>
  )
}""")

    # Update products data
    write_file(lesson_path / "src/data/products.js", """export const products = [
  { id: '1', title: 'React Fundamentals', description: 'Learn React basics and hooks.', price: 29, rating: 5, reviews: 124 },
  { id: '2', title: 'Modern JavaScript', description: 'Master ES6+ features.', price: 25, rating: 4, reviews: 98 },
  { id: '3', title: 'Design Systems', description: 'Build with Tailwind CSS.', price: 22, rating: 5, reviews: 156 },
  { id: '4', title: 'Performance', description: 'Optimize React apps.', price: 27, rating: 4, reviews: 67 },
  { id: '5', title: 'Testing Patterns', description: 'Write robust tests.', price: 24, rating: 5, reviews: 89 },
  { id: '6', title: 'State Management', description: 'Redux, Context, Zustand.', price: 28, rating: 4, reviews: 145 },
]""")

    # Add more pages
    write_file(lesson_path / "src/Pages/Login.jsx", """export function Login() {
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
      </div>
    </section>
  )
}""")

    write_file(lesson_path / "src/Pages/Register.jsx", """export function Register() {
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
      </div>
    </section>
  )
}""")

    write_file(lesson_path / "src/Pages/Cart.jsx", """export function Cart() {
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

    # Update App to show all pages (static, no routing yet)
    write_file(lesson_path / "src/App.jsx", """import { Header } from './Components/Layout/Header'
import { Footer } from './Components/Layout/Footer'
import { Home } from './Pages/Home'

export default function App() {
  return (
    <div className="App dark:bg-dark flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-grow px-4 py-8">
        <Home />
      </main>
      <Footer />
    </div>
  )
}""")

    # Update Home page with more products
    write_file(lesson_path / "src/Pages/Home.jsx", """import { ProductCard } from '../Components/Elements/ProductCard'
import { products } from '../data/products'

export function Home() {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-white shadow-xl shadow-slate-400/10">
        <h2 className="text-4xl font-semibold">Lesson 2: Building Components</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          Now we have more reusable components (Rating, Footer) and more pages (Login, Register, Cart).
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
    write_file(lesson_path / "README.md", """# LTwo-buildingTheComponents

## Topic
Building reusable React components and adding more pages.

## What Changed From Previous Lesson
✅ Added **react-icons** for star ratings  
✅ Created **Rating** component with star display  
✅ Enhanced **ProductCard** to show ratings and reviews  
✅ Added **Footer** component  
✅ Created **Login** page with email/password form  
✅ Created **Register** page with account creation form  
✅ Created **Cart** page (static, empty state)  
✅ Updated **App.jsx** to include Footer  
✅ Expanded product data with ratings and review counts  

## Key Concepts Introduced
- Component composition (smaller pieces → larger UI)
- Passing props to components
- Reusable form patterns
- Empty state messaging
- Icon libraries (react-icons)

## Why These Changes Were Made
Instead of building one giant page, we break the UI into small, testable, reusable components:
- **Rating**: Can be used on products, reviews, user profiles
- **ProductCard**: Combines Header, Description, Price, Rating in one
- **Login/Register/Cart**: Full pages now exist as components
- **Footer**: Shared layout piece across all pages

This pattern scales: future lessons will add routing to switch between these pages, then state to make them interactive.

## What You Should See When You Run This
✓ Header with CodeBook title  
✓ Hero explaining Lesson 2  
✓ **6 product cards** (doubled from Lesson 1) with:
  - Title and description
  - Price
  - **5-star rating display** (new)
  - Review count
  - Hover effect on cards
✓ Footer at the bottom  

All static pages exist in the code—the Home page displays all 6 products as a gallery.

## How to Run
```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Next Lesson
In Lesson 3, we'll add **React Router** to switch between these pages dynamically without page reloads.
""")

    print(f"✓ {lesson} complete")


# ==================== LESSON 3 ====================
def build_lesson_three():
    """LThree: Add React Router and routing."""
    print("\nBuilding LThree-routingAndNavigation...")
    lesson = "LThree-routingAndNavigation"
    copy_entire_lesson("LTwo-buildingTheComponents", lesson)
    lesson_path = ROOT / lesson

    # Update package.json
    pkg = {
        "name": "LThree-routingAndNavigation",
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

    # Update main.jsx to wrap with BrowserRouter
    write_file(lesson_path / "src/main.jsx", """import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)""")

    # Create routing file
    write_file(lesson_path / "src/Routes/AllRoutes.jsx", """import { Routes, Route } from 'react-router-dom'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { Register } from '../Pages/Register'
import { Cart } from '../Pages/Cart'

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}""")

    # Update Header with navigation
    write_file(lesson_path / "src/Components/Layout/Header.jsx", """import { Link } from 'react-router-dom'

export function Header() {
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
          
          <nav className="flex gap-4">
            <Link to="/" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Home
            </Link>
            <Link to="/login" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Login
            </Link>
            <Link to="/register" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Register
            </Link>
            <Link to="/cart" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}""")

    # Update App to use AllRoutes
    write_file(lesson_path / "src/App.jsx", """import { Header } from './Components/Layout/Header'
import { Footer } from './Components/Layout/Footer'
import { AllRoutes } from './Routes/AllRoutes'

export default function App() {
  return (
    <div className="App dark:bg-dark flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-grow px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <AllRoutes />
        </div>
      </main>
      <Footer />
    </div>
  )
}""")

    # Update Login page with registration link
    write_file(lesson_path / "src/Pages/Login.jsx", """import { Link } from 'react-router-dom'

export function Login() {
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

    # Update Register page with login link
    write_file(lesson_path / "src/Pages/Register.jsx", """import { Link } from 'react-router-dom'

export function Register() {
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

    # README
    write_file(lesson_path / "README.md", """# LThree-routingAndNavigation

## Topic
Client-side routing with React Router to switch between pages without reload.

## What Changed From Previous Lesson
✅ Added **react-router-dom** dependency  
✅ Wrapped app in **BrowserRouter** in main.jsx  
✅ Created **AllRoutes** component defining all routes  
✅ Updated **Header** with navigation links (Home, Login, Register, Cart)  
✅ Updated **App.jsx** to render routes  
✅ Added cross-links in Login → Register and Register → Login  

## Key Concepts Introduced
- Browser routing and URL-based navigation
- `<Routes>` and `<Route>` elements
- `<Link>` component for navigation
- SPA (Single Page App) behavior—no server requests for navigation

## Why These Changes Were Made
Without routing, we had static pages sitting in the code unused. React Router lets us:
- Navigate to different pages by URL path (`/`, `/login`, `/cart`, etc.)
- Update the browser address bar as users navigate
- Share links (e.g., `https://codebook.local/cart`)
- Maintain app state across navigation

## What You Should See When You Run This
✓ Header now has navigation links (Home, Login, Register, Cart)  
✓ Click "Login" → see the login form  
✓ Click "Register" → see the registration form  
✓ Click "Home" → back to product gallery  
✓ Click "Cart" → empty cart page  
✓ **Browser address bar updates** (e.g., `/login`, `/cart`)  
✓ No page reload—smooth transitions between pages  
✓ Links in forms work (e.g., "Create Account" → Register page)  

## How to Run
```bash
npm install
npm run dev
```

Navigate between pages using the header links.

## Next Lesson
In Lesson 4, we'll extract common logic into **custom hooks** (like `useTitle` to set document title on each page).
""")

    print(f"✓ {lesson} complete")


if __name__ == '__main__':
    build_lesson_one()
    build_lesson_two()
    build_lesson_three()
    print("\n✅ Lessons 1-3 complete!")
