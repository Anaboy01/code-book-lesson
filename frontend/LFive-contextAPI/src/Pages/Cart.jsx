import { useContext } from 'react'
import { useTitle } from '../Hooks/useTitle'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

export function Cart() {
  useTitle('Shopping Cart')
  const { cartList, total } = useContext(CartContext)

  if (cartList.length === 0) {
    return (
      <section className="mx-auto max-w-4xl py-12">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">Shopping Cart</h1>
        
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <p className="mt-2 text-sm text-slate-500">Add some courses to get started!</p>
          <Link to="/" className="mt-4 inline-block rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white hover:bg-slate-800">
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl py-12">
      <h1 className="mb-8 text-3xl font-semibold text-slate-900">Shopping Cart ({cartList.length})</h1>
      
      <div className="mb-8 space-y-4">
        {cartList.map(item => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
            <span className="font-semibold text-slate-900">\${item.price}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-right text-lg font-semibold text-slate-900">
          Total: \${total.toFixed(2)}
        </p>
      </div>
    </section>
  )
}