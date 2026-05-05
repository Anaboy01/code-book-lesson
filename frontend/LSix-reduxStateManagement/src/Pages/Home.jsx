import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/cartSlice.js'
import { Hero } from '../Components/Sections/Hero.jsx'
import { ProductCard } from '../Components/Elements/ProductCard.jsx'
import { rpc } from '../utils/rpc.js'

export const Home = () => {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

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
              onClick={() => dispatch(addToCart(product))}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
