# Lesson 5: Context API

## Topic
Using **React Context API** to manage global application state. Converting local component state into context providers that make state available across the entire app. Building `CartProvider` and `FilterProvider` to centralize cart management and product filtering.

## Features Introduced in This Lesson
- **CartProvider & CartContext** — Global cart state with add, remove, and clear functionality ✨ NEW
- **FilterProvider & FilterContext** — Global filter state for products ✨ NEW
- **Context Providers** — Wrapping components to provide global state
- **useCart Hook** — Accessing cart from context across components
- **useFilter Hook** — Accessing filter state from context across components
- **localStorage Integration** — Cart persists across page refreshes using Context + useEffect
- **Toast Notifications** — User feedback when items are added/removed from cart

## Features Carried Forward From Previous Lesson
- All custom hooks (useTitle, useCart, useFilter)
- All pages and components
- Tailwind CSS styling and dark mode
- React Router integration

## Features Still To Come
- Admin panel with protected routes
- Authentication service
- API integration with json-server instead of hardcoded data
- Order management
- Advanced features (checkout, payment processing)

## What Changed From the Previous Lesson

### New Files Created
- `src/context/CartContext.jsx` — Context provider for cart state ✨ NEW
- `src/context/FilterContext.jsx` — Context provider for filter state ✨ NEW

### Modified Files
- `src/context/index.js` — Now exports CartProvider/useCart and FilterProvider/useFilter
- `src/main.jsx` — Now wraps app with CartProvider and FilterProvider
- `src/Pages/Home/HomePage.jsx` — Now uses context-based filter
- `src/Pages/Products/ProductList.jsx` — Now uses context-based filter
- `src/Components/Elements/ProductCard.jsx` — Now uses context useCart hook, "Add to Cart" button is functional
- `src/Components/Layout/Header.jsx` — Now displays real cart count from context
- `src/Pages/Cart/CartPage.jsx` — Now displays cart items with remove functionality
- `package.json` — Updated project name to "code-book-lesson-5"

## Key Concepts Introduced
- **Context API** — React's built-in solution for global state management
- **Context Provider** — Component that provides state to all children
- **useContext Hook** — Accessing context values in components
- **useReducer Hook** — Managing complex state with reducer functions
- **Persistent State** — Saving to localStorage and loading on app mount
- **Global State vs Local State** — When to use Context vs useState
- **Provider Architecture** — Nesting multiple providers for different concerns

## Why These Changes Were Made
Moving to Context API allows us to:
1. **Eliminate Prop Drilling** — No need to pass cart/filter through components that don't need it
2. **Centralize State Logic** — Cart and filter state managed in one place
3. **Make State Persistent** — Cart survives page refreshes
4. **Prepare for Advanced Features** — Context makes it easy to add admin features, authentication, etc.
5. **Improve Performance** — Only components that need state re-render when it changes

## What You Should See When You Run This
When you run `npm install && npm run dev`:

### Working Features
- **Add to Cart** — Click "Add to Cart" on any product, see toast notification and cart count increases in header
- **Cart Badge** — Header shows cart count with number badge
- **View Cart** — Go to /cart and see all items with images, names, prices
- **Remove from Cart** — Delete button on each cart item removes it, toast confirms
- **Clear Cart** — Button to clear all items at once
- **Persistent Cart** — Reload the page, cart items remain (localStorage)
- **Filter Products** — Still works from Lesson 4, now using context
- **Dark Mode** — Toggle dark mode with settings icon, persists in localStorage

### UI/UX Improvements
- Toast notifications on add/remove/clear actions
- Real cart count badge in header
- Cart page displays actual items with images
- Remove buttons use trash icon
- Responsive design on mobile and desktop

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

## Context Architecture

### CartContext
```javascript
// Provides:
{
  cartList: [],           // Array of product objects in cart
  total: 0,              // Sum of all prices
  loading: false,        // Loading state for async operations
  addToCart(product),    // Add product to cart
  removeFromCart(id),    // Remove product by id
  clearCart()            // Clear all items
}

// Storage: Persists to localStorage as 'cart'
```

### FilterContext
```javascript
// Provides:
{
  productList: [],            // All products available
  setProductList(products),   // Update product list
  filteredProducts: [],       // Products after applying filters
  sortBy: "",                 // Current sort option
  setSortBy(sort),            // Change sort
  onlyInStock: false,         // Filter by stock
  setOnlyInStock(bool),       // Toggle stock filter
  bestSellerOnly: false,      // Filter by bestseller
  setBestSellerOnly(bool),    // Toggle bestseller filter
  ratings: [],                // Filter by rating
  setRatings(ratings),        // Set rating filters
  clearFilters()              // Reset all filters
}
```

## State Management Flow
```
App (in main.jsx)
├── CartProvider
│   ├── Header (reads cartList for badge)
│   ├── ProductCard (calls addToCart)
│   ├── CartPage (reads cartList, total, calls remove/clear)
│   └── ... all children can access useCart()
│
└── FilterProvider
    ├── HomePage (calls setProductList)
    ├── ProductList (reads filtered products, calls setSortBy etc)
    └── ... all children can access useFilter()
```

## Project Structure
```
LFive-contextAPI/
├── src/
│   ├── context/
│   │   ├── CartContext.jsx ✨ NEW - Context + Provider + useCart hook
│   │   ├── FilterContext.jsx ✨ NEW - Context + Provider + useFilter hook
│   │   └── index.js (exports)
│   ├── Components/
│   │   ├── Layout/Header.jsx (uses useCart for badge)
│   │   └── Elements/ProductCard.jsx (uses useCart for add)
│   ├── Pages/
│   │   ├── Home/HomePage.jsx (uses useFilter)
│   │   ├── Products/ProductList.jsx (uses useFilter)
│   │   └── Cart/CartPage.jsx (uses useCart)
│   ├── main.jsx (wrapped with providers)
│   └── ...
└── package.json
```

## How It Works: Adding Item to Cart

1. User clicks "Add to Cart" on ProductCard
2. `ProductCard` calls `addToCart(product)` from `useCart` hook
3. `useCart` is accessing `CartContext`
4. `CartContext` dispatch action to `cartReducer`
5. `cartReducer` updates state with new item
6. `CartContext.Provider` value changes
7. All components reading `useCart` re-render with new data
8. Header shows updated cart count
9. Toast notification confirms action
10. localStorage is updated with new cart

## Comparison: Before vs After Context

### Before (Lesson 4 - Local State)
```javascript
// Each component had its own cart state
const [cartList, setCartList] = useState([]);
// Props drilling if other components needed it
<ProductCard product={product} onAddToCart={handleAdd} />
```

### After (Lesson 5 - Context)
```javascript
// One central CartContext
const { cartList, addToCart } = useCart();
// No props needed, available everywhere
<ProductCard product={product} /> // Can use useCart internally
```

## Next Steps
In **Lesson 6: Advanced Features**, we'll:
- Add admin functionality to create new products
- Implement protected routes for admin access
- Add product management service
- Build admin dashboard

Then in **Lesson 7: json-server**, we'll:
- Replace all hardcoded data with API calls to json-server
- Implement authentication with real backend
- Save orders and user data to database
- Complete the full-stack experience

## Reference
See `frontend/main-client/` for the full production version of this project.
