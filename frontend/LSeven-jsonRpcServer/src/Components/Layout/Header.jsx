import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Header = () => {
  const itemCount = useSelector((state) => state.cart.items.length)

  return (
    <header className="mb-8 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Bookstore JSON-RPC</h1>
          <p className="mt-2 text-slate-600">A full app connected to a JSON-RPC backend.</p>
        </div>
        <nav className="flex items-center gap-4 text-slate-700">
          <Link to="/" className="font-medium hover:text-slate-900">Home</Link>
          <Link to="/cart" className="font-medium hover:text-slate-900">Cart ({itemCount})</Link>
        </nav>
      </div>
    </header>
  )
}
