import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct.js'
import { useTitle } from '../hooks/useTitle.js'

export const ProductDetails = () => {
  const { id } = useParams()
  const { product, loading } = useProduct(id)

  useTitle(product ? `${product.title} | Bookstore` : 'Loading...')

  if (loading) {
    return <div>Loading product details...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
      <Link to="/" className="text-slate-600 hover:text-slate-900">← Back to home</Link>
      <div className="mt-6 space-y-4">
        <h2 className="text-3xl font-semibold text-slate-900">{product.title}</h2>
        <p className="text-slate-600">{product.description}</p>
        <p className="text-2xl font-semibold text-slate-900">${product.price}</p>
      </div>
    </section>
  )
}
