import { createContext, useReducer } from 'react'
import { cartReducer } from '../reducers/cartReducer'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const initialState = { cartList: [], total: 0, loading: false }
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}