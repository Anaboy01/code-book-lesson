import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../Components/Sections/Hero.jsx'
import { ProductCard } from '../Components/Elements/ProductCard.jsx'
import { rpc } from '../utils/rpc.js'

export const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    rpc.getProducts().then(setProducts)
  }, [])

  return (
    <section className="mx-auto max-w-6xl">
      <Hero />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  )
}
