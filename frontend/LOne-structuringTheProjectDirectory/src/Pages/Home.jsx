import { ProductCard } from '../Components/Elements/ProductCard'
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
}