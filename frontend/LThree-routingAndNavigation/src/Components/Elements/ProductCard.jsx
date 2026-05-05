export const ProductCard = ({ product }) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200 transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
      <p className="mt-3 text-slate-600">{product.description}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">${product.price}</span>
      </div>
    </article>
  )
}
