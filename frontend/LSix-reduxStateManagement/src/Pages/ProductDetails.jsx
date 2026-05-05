import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { addToCart } from '../store/cartSlice.js'
import { rpc } from '../utils/rpc.js'
import { useTitle } from '../hooks/useTitle.js'

export const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    rpc.getProductById(id).then(setProduct)
  }, [id])

  useTitle(product ? `${product.title} | Bookstore` : 'Loading...')

  if (!product) {
    return <div>Loading product details...</div>
  }

  return (
    <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
      <Link to="/" className="text-slate-600 hover:text-slate-900">← Back to home</Link>
      <div className="mt-6 space-y-4">
        <h2 className="text-3xl font-semibold text-slate-900">{product.title}</h2>
        <p className="text-slate-600">{product.description}</p>
        <p className="text-2xl font-semibold text-slate-900">${product.price}</p>
        <button
          className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart
        </button>
      </div>
    </section>
  )
}
