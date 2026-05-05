export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, cartList: action.payload, loading: false }
    case 'ADD_TO_CART':
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
        total: state.total + action.payload.price,
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartList: state.cartList.filter(item => item.id !== action.payload),
        total: state.total - (state.cartList.find(i => i.id === action.payload)?.price || 0),
      }
    case 'CLEAR_CART':
      return { cartList: [], total: 0, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}