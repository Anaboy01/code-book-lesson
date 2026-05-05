import { useEffect, useState } from 'react'
import { rpc } from '../utils/rpc.js'

export const useProduct = (id) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    rpc.getProductById(id).then((data) => {
      setProduct(data)
      setLoading(false)
    })
  }, [id])

  return { product, loading }
}
