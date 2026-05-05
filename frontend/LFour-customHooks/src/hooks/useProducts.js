import { useEffect, useState } from 'react'
import { rpc } from '../utils/rpc.js'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    rpc.getProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  return { products, loading }
}
