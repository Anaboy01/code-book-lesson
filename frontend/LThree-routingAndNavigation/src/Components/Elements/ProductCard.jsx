import { Rating } from './Rating'

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
}