import { Link } from 'react-router-dom'
import { useTitle } from '../Hooks/useTitle'

export function Register() {
  useTitle('Create Account')

  return (
    <section className="mx-auto max-w-md py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Create Account</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input 
              type="text" 
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="John Doe"
            />
          </div>
          
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
            Create Account
          </button>
        </form>
        
        <p className="mt-4 text-center text-slate-600">
          Already have an account? {' '}
          <Link to="/login" className="font-semibold text-slate-900 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  )
}