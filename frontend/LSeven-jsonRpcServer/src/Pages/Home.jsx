import { useTitle } from '../Hooks/useTitle'
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
}