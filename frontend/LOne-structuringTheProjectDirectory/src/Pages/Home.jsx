import { ProductCard } from '../Components/Elements/ProductCard.jsx'
import products from '../data/products.js'

export const Home = () => {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-3xl bg-slate-950 p-8 text-white shadow-xl shadow-slate-400/10">
        <h2 className="text-3xl font-semibold">Lesson 1: Project Structure</h2>
        <p className="mt-3 max-w-2xl text-slate-200">
          This lesson introduces the folder layout and the first working UI shell.
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
