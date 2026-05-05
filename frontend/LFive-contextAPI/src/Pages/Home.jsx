import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../Components/Sections/Hero.jsx'
import { ProductCard } from '../Components/Elements/ProductCard.jsx'
import { rpc } from '../utils/rpc.js'
import { CartContext } from '../context/CartContext.jsx'

export const Home = () => {
  const [products, setProducts] = useState([])
  const { dispatch } = useContext(CartContext)

  useEffect(() => {
    rpc.getProducts().then(setProducts)
  }, [])

  return (
    <section className="mx-auto max-w-6xl">
      <Hero />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="space-y-3">
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
            <button
              className="rounded-full bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
              onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
