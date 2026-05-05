import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { FilterProvider } from './context/FilterContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <FilterProvider>
        <App />
        <ToastContainer position="bottom-right" />
      </FilterProvider>
    </CartProvider>
  </BrowserRouter>,
)