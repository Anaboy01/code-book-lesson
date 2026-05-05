import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="mb-8 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-3xl font-semibold text-slate-900 hover:text-slate-700">
              CodeBook
            </Link>
            <p className="mt-2 text-slate-600">A React lesson series, lesson by lesson.</p>
          </div>
          
          <nav className="flex gap-4">
            <Link to="/" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Home
            </Link>
            <Link to="/login" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Login
            </Link>
            <Link to="/register" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Register
            </Link>
            <Link to="/cart" className="rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100">
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}