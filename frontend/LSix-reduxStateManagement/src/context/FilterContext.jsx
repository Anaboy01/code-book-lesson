import { createContext, useReducer } from 'react'

export const FilterContext = createContext()

const initialState = {
  search: '',
  category: '',
  priceRange: [0, 100],
  sortBy: 'name',
}

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload }
    case 'RESET_FILTERS':
      return initialState
    default:
      return state
  }
}

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  return (
    <FilterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilterContext.Provider>
  )
}