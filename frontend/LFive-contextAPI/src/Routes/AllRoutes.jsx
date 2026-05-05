import { Routes, Route } from 'react-router-dom'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { Register } from '../Pages/Register'
import { Cart } from '../Pages/Cart'

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}