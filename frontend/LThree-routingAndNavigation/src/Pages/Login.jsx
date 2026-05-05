import { Link } from 'react-router-dom'

export function Login() {
  return (
    <section className="mx-auto max-w-md py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Sign In</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          
          <button className="mt-6 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-800">
            Sign In
          </button>
        </form>
        
        <p className="mt-4 text-center text-slate-600">
          Don't have an account? {' '}
          <Link to="/register" className="font-semibold text-slate-900 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  )
}