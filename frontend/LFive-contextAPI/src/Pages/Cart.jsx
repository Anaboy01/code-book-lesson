import { useContext } from 'react'
import { CartContext } from '../context/CartContext.jsx'

export const Cart = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
      <h2 className="text-3xl font-semibold text-slate-900">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="mt-4 text-slate-600">No items have been added yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="text-slate-600">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
