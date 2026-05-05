import { useTitle } from '../Hooks/useTitle'
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
}