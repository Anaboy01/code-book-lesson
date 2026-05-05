import { useTitle } from '../Hooks/useTitle'

export function Cart() {
  useTitle('Shopping Cart')

  return (
    <section className="mx-auto max-w-4xl py-12">
      <h1 className="mb-8 text-3xl font-semibold text-slate-900">Shopping Cart</h1>
      
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="text-center text-slate-600">Your cart is empty.</p>
        <p className="mt-2 text-center text-sm text-slate-500">Add some courses to get started!</p>
      </div>
    </section>
  )
}