import { useContext } from 'react'
import { Rating } from './Rating'
import { CartContext } from '../../context/CartContext'
import { FiShoppingCart } from 'react-icons/fi'

export function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext)

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200 transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
      <p className="mt-3 text-slate-600">{product.description}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-lg font-semibold text-slate-900">\${product.price}</span>
          <div className="mt-1">
            <Rating rating={product.rating} count={product.reviews} />
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="rounded-lg bg-slate-900 p-2 text-white hover:bg-slate-800"
        >
          <FiShoppingCart size={20} />
        </button>
      </div>
    </article>
  )
}