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

## Topic
Implementing client-side routing with React Router v7 to enable multi-page navigation without page reloads. Building linked pages for browsing, viewing details, authentication forms, and shopping cart.

## Features Introduced in This Lesson
- **React Router v7** — Client-side routing for single-page application (SPA)
- **BrowserRouter** — Root routing context provider
- **Routes & Route Components** — Defining URL routes and mapping them to page components
- **Link Component** — Navigation links that don't reload the page
- **useParams Hook** — Accessing URL parameters (e.g., product ID)
- **useNavigate Hook** — Programmatic navigation
- **Login Page** — Form for user authentication (placeholder, no backend yet)
- **Register Page** — User registration form (placeholder)
- **Product Details Page** — Full product view accessible via `/products/:id`
- **Cart Page** — Shopping cart interface (empty in this lesson)
- **Navigation Header** — Updated with working links to Home, Products, Login, and Cart

## Features Carried Forward From Previous Lesson
- Header, Footer, ProductCard, Rating components
- HomePage and ProductList pages (now routed)
- Tailwind CSS and dark mode
- Project structure

## Features Still To Come
- Custom hooks (useTitle, useCart, useFilter)
- Context API for state management
- API integration with json-server
- Admin panel and protected routes
- Form submission with backend integration
- Search functionality
- Product filtering and sorting

## What Changed From the Previous Lesson

### New Files Created
- `src/Pages/Login.jsx` — Login form page
- `src/Pages/Register.jsx` — Registration form page
- `src/Pages/ProductDetails.jsx` — Individual product view with full details
- `src/Pages/Cart/CartPage.jsx` — Shopping cart page

### Modified Files
- `src/main.jsx` — Added BrowserRouter wrapper
- `src/App.jsx` — Now uses AllRoutes component
- `src/Routes/AllRoutes.jsx` — Routing configuration with all page routes
- `src/Components/Layout/Header.jsx` — Added navigation Links
- `src/Components/Elements/ProductCard.jsx` — Product images and titles are now clickable Links
- `package.json` — Updated project name to "code-book-lesson-3"

## Key Concepts Introduced
- **Client-Side Routing** — Navigation without server requests
- **Single Page Application (SPA)** — App that dynamically updates instead of full page reloads
- **URL Parameters** — Dynamic routes like `/products/:id`
- **Navigation Links** — Using Link instead of anchors to maintain app state
- **Programmatic Navigation** — Using useNavigate for form submissions or redirects

## Why These Changes Were Made
This lesson transforms the app from a static single-page view to a **multi-page navigable application**. React Router is the industry-standard for client-side routing in React. By introducing this now, learners can build realistic workflows like browsing products, viewing details, and accessing authentication pages—all without full page reloads.

## What You Should See When You Run This
When you run `npm install && npm run dev`:
- **Header Navigation** — Links to Home, Products, and icon links to Login/Cart work without page reload
- **Home Page** (`/`) — Shows featured eBooks (same as before)
- **Products Page** (`/products`) — Shows all eBooks as clickable cards
- **Product Details** (`/products/:id`) — Click any product card to see full details (back button works)
- **Login Page** (`/login`) — Form page with email/password inputs
- **Register Page** (`/register`) — Form page with name, email, password fields
- **Cart Page** (`/cart`) — Empty cart with "Continue Shopping" link
- **Fast Navigation** — Clicking links should be instant (no full page refresh)
- **Back Button Works** — Browser back button navigates between pages correctly

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

## Routes Available
- `/` — Home page
- `/products` — All products
- `/products/:id` — Single product details (try `/products/10001`)
- `/login` — Login page
- `/register` — Register page
- `/cart` — Shopping cart

## Reference
See `frontend/main-client/` for the full production version of this project.

## Component & Route Structure Created
```
LThree-routingAndNavigation/
├── src/
│   ├── Routes/
│   │   └── AllRoutes.jsx ✨ NEW (routing config)
│   ├── Pages/
│   │   ├── Login.jsx ✨ NEW
│   │   ├── Register.jsx ✨ NEW
│   │   ├── ProductDetails.jsx ✨ NEW
│   │   ├── Cart/
│   │   │   └── CartPage.jsx ✨ NEW
│   │   └── ... (other pages)
│   ├── Components/
│   │   └── Layout/
│   │       └── Header.jsx (modified with Links)
│   └── App.jsx (modified to use AllRoutes)
└── src/main.jsx (modified with BrowserRouter)
```

## Next Steps
In Lesson 4, we'll introduce custom hooks (useTitle to set page titles, useCart for cart management, useFilter for product filtering). These hooks will encapsulate component logic and make pages more reusable.

## Topic
Creating reusable React components (Header, Footer, ProductCard, Rating) and building page layouts using component composition and state management with hooks.

## Features Introduced in This Lesson
- **Header Component** — Navigation bar with dark mode toggle, search icon, cart badge, and profile icon
- **Footer Component** — Multi-column footer with links and copyright info
- **Rating Component** — Star display for product ratings
- **ProductCard Component** — Reusable component displaying product information with image, name, price, rating, and "Add to Cart" button
- **HomePage** — Landing page with featured eBooks grid
- **ProductList Page** — Page displaying all products in a grid with sorting button
- **Component Composition** — Using smaller, reusable components to build larger pages
- **Sample Data** — Hardcoded product data (will be replaced with API calls in later lessons)

## Features Carried Forward From Previous Lesson
- Vite + React setup
- Tailwind CSS styling with dark mode
- Project folder structure
- Global CSS configuration

## Features Still To Come
- React Router integration and navigation between pages
- Custom hooks (useTitle, useCart, useFilter)
- Context API for state management
- API integration with json-server
- Admin panel and protected routes
- User authentication

## What Changed From the Previous Lesson

### New Files Created
- `src/Components/Layout/Header.jsx` — Navigation header component
- `src/Components/Layout/Footer.jsx` — Footer component
- `src/Components/Elements/Rating.jsx` — Star rating display component
- `src/Components/Elements/ProductCard.jsx` — Product card component
- `src/Pages/Home/HomePage.jsx` — Home page component
- `src/Pages/Products/ProductList.jsx` — Products page component

### Modified Files
- `src/App.jsx` — Now uses Header, Footer, and HomePage components
- `src/Components/index.js` — Exports Header, Footer, Rating, ProductCard
- `src/Pages/index.js` — Exports HomePage, ProductList
- `package.json` — Updated project name to "code-book-lesson-2"

## Key Concepts Introduced
- **Component Composition** — Building complex UIs by combining smaller components
- **Props** — Passing data to components
- **useState Hook** — Managing local component state
- **useEffect Hook** — Loading data when components mount
- **Conditional Rendering** — Showing/hiding UI elements based on state
- **Tailwind Responsive Classes** — Grid layouts that adapt to screen size

## Why These Changes Were Made
This lesson focuses on **component-driven development**, a fundamental React concept. By building reusable components (Header, Footer, ProductCard) and composing them into pages, learners understand how modern React applications are structured as hierarchies of components. This foundation makes it easy to understand routing, state management, and API integration in later lessons.

## What You Should See When You Run This
When you run `npm install && npm run dev`:
- **Header** — Visible at the top with CodeBook logo, dark mode toggle, search icon, cart icon, and profile icon
- **Featured eBooks Section** — Three product cards displaying on the home page
- **All eBooks Page** — Navigate would show a grid of 12 product cards (functionality added in Lesson 3)
- **Dark Mode** — Clicking the gear icon toggles dark mode and persists in localStorage
- **Product Cards** — Each card displays product image, name, 5-star rating, price, and "Add to Cart" button
- **Footer** — Visible at the bottom with links and copyright info
- **Responsive Layout** — Grid adapts from 1 column on mobile to 3 columns on desktop

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

## Reference
See `frontend/main-client/` for the full production version of this project.

## Component Structure Created
```
LTwo-buildingTheComponents/
├── src/
│   ├── Components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx ✨ NEW
│   │   │   └── Footer.jsx ✨ NEW
│   │   ├── Elements/
│   │   │   ├── Rating.jsx ✨ NEW
│   │   │   └── ProductCard.jsx ✨ NEW
│   │   └── index.js
│   ├── Pages/
│   │   ├── Home/
│   │   │   └── HomePage.jsx ✨ NEW
│   │   ├── Products/
│   │   │   └── ProductList.jsx ✨ NEW
│   │   └── index.js
│   └── App.jsx (modified)
```

## Next Steps
In Lesson 3, we'll add React Router to enable navigation between pages. The ProductList page will become fully functional, and we'll add routes for product details, login, registration, and cart pages.
