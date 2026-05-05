#!/usr/bin/env python3
"""
Rebuild React lesson series as cumulative snapshots.
Each lesson contains EVERYTHING from prior lessons + new concept.
"""
import os
import json
import shutil
from pathlib import Path

ROOT = Path('/Users/mac/Documents/code-book/frontend')

# Common files reused in all lessons
COMMON_INDEX_HTML = """<!doctype html>
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
</html>"""

COMMON_VITE_CONFIG = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})"""

VITE_CONFIG_WITH_PROXY = """import { defineConfig } from 'vite'
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
})"""

COMMON_INDEX_CSS = """@import "tailwindcss";

@theme {
  --color-dark: #1e253b;
}
"""

def clear_lesson_dir(lesson_name):
    """Remove existing lesson folder entirely."""
    lesson_path = ROOT / lesson_name
    if lesson_path.exists():
        shutil.rmtree(lesson_path)
        print(f"  Cleared {lesson_name}")

def copy_entire_lesson(source_name, dest_name):
    """Copy entire lesson folder as base for next lesson."""
    source = ROOT / source_name
    dest = ROOT / dest_name
    if dest.exists():
        shutil.rmtree(dest)
    shutil.copytree(source, dest)
    print(f"  Copied {source_name} → {dest_name}")

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

# ==================== LESSON 1 ====================
def build_lesson_one():
    """LOne: Basic project structure with home page only."""
    print("\nBuilding LOne-structuringTheProjectDirectory...")
    lesson = "LOne-structuringTheProjectDirectory"
    clear_lesson_dir(lesson)
    lesson_path = ROOT / lesson
    mkdir(lesson_path)

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

    # HTML, Vite, CSS
    write_file(lesson_path / "index.html", COMMON_INDEX_HTML)
    write_file(lesson_path / "vite.config.js", COMMON_VITE_CONFIG)
    write_file(lesson_path / "src/index.css", COMMON_INDEX_CSS)

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

    # Home page with product list
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
        <span className="text-lg font-semibold text-slate-900">${product.price}</span>
      </div>
    </article>
  )
}""")

    # Products data
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

## What Changed From the Previous Lesson
This is the first lesson and establishes the base project structure for all following lessons.

### New Files
- `src/main.jsx` — entry point and React root render
- `src/App.jsx` — top-level app layout
- `src/Components/Layout/Header.jsx` — shared header component
- `src/Components/Elements/ProductCard.jsx` — reusable product card component
- `src/Pages/Home.jsx` — home page displaying products
- `src/data/products.js` — sample product data
- `src/index.css` — global Tailwind theme and styles
- `vite.config.js` — Vite build configuration
- `package.json` — project dependencies

### Modified Files
- None (this is the first lesson)

## Key Concepts Introduced
- React project folder conventions
- Component-based architecture (Layout, Elements, Pages)
- Tailwind CSS for styling
- Module imports and exports
- JSX structure

## Why These Changes Were Made
This foundation establishes a stable, organized structure that future lessons will build upon without reorganizing the root layout. The folder hierarchy separates concerns: Layout components, reusable Elements, complete Pages, and shared data.

## What You Should See When You Run This
A clean homepage with:
- A header at the top saying "CodeBook"
- A hero section explaining this is Lesson 1
- Four product cards displayed in a responsive grid
- Professional styling with white cards on a light background

## How to Run
```bash
npm install
npm start
```

Then open http://localhost:5173 in your browser.

## Reference
See `frontend/main-client/` for the full production version.
""")

    print(f"✓ {lesson} created")


if __name__ == '__main__':
    build_lesson_one()
    print("\n✅ Lesson 1 complete!")
