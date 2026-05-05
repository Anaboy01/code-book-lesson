import { useProducts } from '../hooks/useProducts.js'
import { Hero } from '../Components/Sections/Hero.jsx'
import { ProductCard } from '../Components/Elements/ProductCard.jsx'
import { Link } from 'react-router-dom'

export const Home = () => {
  const { products, loading } = useProducts()

  return (
    <section className="mx-auto max-w-6xl">
      <Hero />
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
