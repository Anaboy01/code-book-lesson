import { Route, Routes } from "react-router-dom";
import { HomePage, ProductList } from "../Pages";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProductDetails from "../Pages/ProductDetails";
import CartPage from "../Pages/Cart/CartPage";
import AdminPage from "../Pages/Admin/AdminPage";
import AdminProtectedRoute from "./AdminProtectedRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/products/:id" element={<ProductDetails/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route 
        path="/admin" 
        element={
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  )
}
