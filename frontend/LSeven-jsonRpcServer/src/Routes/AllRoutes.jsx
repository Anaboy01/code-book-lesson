import { Route, Routes } from 'react-router-dom'
import { Home } from '../Pages/Home.jsx'
import { ProductDetails } from '../Pages/ProductDetails.jsx'
import { Cart } from '../Pages/Cart.jsx'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}
