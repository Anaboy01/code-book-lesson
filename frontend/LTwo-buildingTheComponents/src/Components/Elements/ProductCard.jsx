export const ProductCard = ({ product }) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
        <p className="text-slate-600">{product.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">${product.price}</span>
      </div>
    </article>
  )
}
