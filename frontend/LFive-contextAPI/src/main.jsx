import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider, FilterProvider } from './context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <FilterProvider>
          <App/>
          <ToastContainer />
        </FilterProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
