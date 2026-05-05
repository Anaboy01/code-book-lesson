import { createStore, combineReducers } from 'redux'
import { cartReducer } from '../reducers/cartReducer'

const filterReducer = (state = { search: '', category: '', priceRange: [0, 100] }, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterReducer,
})

export const store = createStore(rootReducer)