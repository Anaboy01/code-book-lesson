# CodeBook - Main Client Project Map

A complete architectural and structural overview of the main-client eBook store application.

---

## 1. ALL PAGES (src/Pages/)

### Core Pages
- **HomePage.jsx** - Landing page with hero, featured products, testimonials, and FAQ sections
- **Login.jsx** - User authentication page with email/password login and guest option
- **Register.jsx** - New user registration with name, email, and password fields
- **ProductDetails.jsx** - Individual product detail view with price, rating, stock status, add/remove from cart
- **Products/ProductList.jsx** - Main product catalog with search, filtering, and sorting
- **ProductsDemo.jsx** - Demo page with sample products for UI testing

### Feature Pages
- **Cart/CartPage.jsx** - Main cart container (shows CartList or CartEmpty)
- **Cart/CartDemo.jsx** - Unused demo cart component
- **Dashboard/Dashboardpage.jsx** - User dashboard showing order history
- **Order/Order.jsx** - Order summary page with success/fail states
- **Admin/AdminPage.jsx** - Admin panel wrapper for product management

---

## 2. ALL COMPONENTS (by Category)

### Layout Components (src/Components/Layout/)
- **Header.jsx** - Navigation bar with logo, search, cart icon, profile dropdown, dark mode toggle, login status check
- **Footer.jsx** - Footer with social media links (Instagram, Twitter, GitHub)

### Element Components (src/Components/Elements/)
- **ProductCard.jsx** - Reusable product display card with image, name, price, rating, stock status, add/remove buttons
- **Rating.jsx** - Star rating display component (shows 1-5 filled/empty stars)
- **DroddownLoggedIn.jsx** - Dropdown menu for authenticated users (Dashboard, All eBooks, Logout)
- **DropdownLoggedOut.jsx** - Dropdown menu for non-authenticated users (Login, Register)

### Section Components (src/Components/Sections/)
- **Search.jsx** - Search bar with form that navigates to product list with query parameter

### Other Components (src/Components/other/)
- **ScrollToTop.jsx** - Auto-scrolls to top on route changes

### Home Page Components (src/Pages/Home/Components/)
- **Hero.jsx** - Banner with headline and call-to-action button
- **FeaturedProduct.jsx** - Carousel/grid of best-selling products
- **Testimonials.jsx** - Customer testimonials section
- **Faq.jsx** - Frequently asked questions section
- **Accordion.jsx** - Reusable accordion component for FAQ items

### Cart Components (src/Pages/Cart/Components/)
- **CartList.jsx** - Cart items list with total and "Place Order" button
- **CartCard.jsx** - Individual cart item display with image, name, price, remove button
- **CartEmpty.jsx** - Empty state message when no items in cart
- **Checkout.jsx** - Modal overlay with order form (name, email, address, card details)

### Dashboard Components (src/Pages/Dashboard/Components/)
- **DashboardCard.jsx** - Individual order card showing order ID, status, date, items, total
- **DashboardEmpty.jsx** - Empty state message when no orders exist

### Order Components (src/Pages/Order/Components/)
- **OrderSuccess.jsx** - Success message with order details and confirmation
- **OrderFail.jsx** - Error message with failure reason

### Admin Components (src/Components/Admin/)
- **AdminProductList.jsx** - Table/list of products with search, edit, delete, add buttons
- **AdminProductForm.jsx** - Form to create/edit products (name, price, image, description)

### Product Filter Components (src/Pages/Products/Components/)
- **FilterBar.jsx** - Sidebar drawer with sort, rating, stock, and best-seller filters

---

## 3. CUSTOM HOOKS (src/Hooks/)

- **useTitle.js** - Updates document title dynamically (sets `title - BookStore` format)

---

## 4. SERVICES / API LAYER (src/Services/)

### Service Files

**productServices.js**
- `getProductList(searchTerm)` - Fetch all products, optional client-side search filtering
- `getProduct(id)` - Fetch single product by ID
- `getFeaturedList()` - Fetch best-seller products (best_seller === true)
- `transformProduct()` - Normalize product data from backend

**authService.jsx**
- `login(authDetail)` - POST login with email/password
- `register(authDetail)` - POST register with name/email/password
- `logout()` - Logout user and clear session
- `persistEmail()` - Store user email in localStorage
- `clearPersistence()` - Clear user data from localStorage

**cartService.js**
- `getUserCart()` - GET user's cart items
- `addToCartAPI(product)` - POST product to cart
- `removeFromCartAPI(product)` - DELETE product from cart
- `clearCartAPI()` - DELETE all items from cart
- `transformCartData()` - Calculate total price from cart items

**orderServices.js**
- `placeOrder(cartItems)` - POST order (backend uses authenticated user's cart)
- `getUserOrder()` - GET all orders for current user
- `getOrderById(orderId)` - GET single order by ID
- `transformOrderData()` - Normalize order data

**dataService.js**
- `getUser()` - GET current user profile (null if not authenticated)
- `checkLoggingStatus()` - GET login status via dedicated endpoint

**adminService.js**
- `checkAdminStatus()` - Verify if user is admin (used in AdminProtectedRoute)

**mockDatabase.js** - Contains mock data for development/testing

### API Configuration (src/config/api.js)

**API Endpoints**
```javascript
USER_ENDPOINTS:
  - REGISTER_USER: /api/users/registerUser
  - LOGIN: /api/users/login
  - LOGOUT: /api/users/logOut
  - LOGIN_STATUS: /api/users/loginStatus
  - USER_PROFILE: /api/users/UserProfile

EBOOK_ENDPOINTS:
  - GET_ALL: /api/ebook/getAllEbook
  - GET_SINGLE(id): /api/ebook/singleEbook/:id
  - CREATE: /api/ebook/createEbook
  - UPDATE(id): /api/ebook/updateEbook/:id

CART_ENDPOINTS:
  - GET_USER_CART: /api/cart/getUserCart
  - ADD_TO_CART: /api/cart/addToCart
  - REMOVE_FROM_CART: /api/cart/removeFromCart
  - CLEAR_CART: /api/cart/clearCart

ORDER_ENDPOINTS:
  - PLACE_ORDER: /api/order/placeOrder
  - GET_USER_ORDERS: /api/order/getUserOrders
  - GET_ORDER_BY_ID(id): /api/order/getOrderById/:id
```

**Helper Functions**
- `apiRequest(url, options)` - Centralized fetch wrapper with error handling
- `handleApiResponse(response)` - Parse responses and throw errors
- `getBaseURL()` - Returns `/api` in dev, environment variable in prod

---

## 5. CONTEXT PROVIDERS (src/context/)

### CartContext.jsx
**State:**
- `cartList[]` - Array of cart items
- `total` - Sum of all item prices
- `loading` - Boolean for async operations

**Providers & Functions:**
- `CartProvider` - Wraps app with cart state
- `useCart()` - Hook to access cart context

**Actions (via cartReducer):**
- `LOAD_CART` - Initialize cart on mount
- `ADD_TO_CART` - Add item and recalculate total
- `REMOVE_FROM_CART` - Remove item and recalculate total
- `CLEAR_CART` - Empty cart
- `SET_LOADING` - Toggle loading state

**Methods Exposed:**
- `addToCart(product)` - Calls API and updates state
- `removeFromCart(product)` - Calls API and updates state
- `clearCart()` - Calls API and updates state
- `clearCartLocal()` - Clear state only (no API call)
- `loadCart()` - Fetch cart from server

### FilterContext.jsx
**State:**
- `productList[]` - All products
- `onlyInStock` - Boolean filter
- `bestSellerOnly` - Boolean filter
- `sortBy` - "lowtohigh" | "hightolow" | null
- `ratings` - "4STARSABOVE" | "3STARSABOVE" | "2STARSABOVE" | "1STARABOVE" | null

**Providers & Functions:**
- `FilterProvider` - Wraps app with filter state
- `useFilter()` - Hook to access filter context

**Actions (via filterReducer):**
- `PRODUCT_LIST` - Initialize product list
- `SORT_BY` - Set sort option
- `RATINGS` - Set rating filter
- `BEST_SELLER_ONLY` - Toggle best seller filter
- `ONLY_IN_STOCK` - Toggle stock filter
- `CLEAR_FILTER` - Reset all filters

**Computed Properties:**
- `products` - Filtered/sorted product list based on current state
- `initialProductList()` - Load products into context

---

## 6. REDUCERS (src/reducers/)

### cartReducer.js
Handles cart state transitions:
```javascript
LOAD_CART → {cartList, total}
ADD_TO_CART → {cartList, total}
REMOVE_FROM_CART → {cartList, total}
CLEAR_CART → {cartList: [], total: 0}
SET_LOADING → {loading: boolean}
```

### filterReducer.js
Handles filter state transitions:
```javascript
PRODUCT_LIST → Set initial product list
SORT_BY → Set sort option (lowtohigh/hightolow)
RATINGS → Set rating threshold (1-4 stars)
BEST_SELLER_ONLY → Toggle best seller filter
ONLY_IN_STOCK → Toggle stock filter
CLEAR_FILTER → Reset all filters to defaults
```

---

## 7. ROUTING STRUCTURE (src/Routes/)

### AllRoutes.jsx - Route Configuration
```
/ → HomePage
/login → Login
/register → Register
/products → ProductList
/products/:id → ProductDetails
/demo → ProductsDemo
/Cart → CartPage
/dashboard → Dashboardpage (requires login)
/Order-Summary → Order
/admin → AdminPage (protected by AdminProtectedRoute)
```

### AdminProtectedRoute.jsx
- Checks if user is admin via `adminService.checkAdminStatus()`
- Redirects to /login if not admin
- Shows loading spinner while verifying
- Only allows admin users to access /admin route

---

## 8. PACKAGE DEPENDENCIES

**Production Dependencies:**
- `react@^19.2.0` - Core React library
- `react-dom@^19.2.0` - React DOM rendering
- `react-router-dom@^7.9.5` - Client-side routing
- `react-toastify@^11.0.5` - Toast notifications
- `react-icons@^5.5.0` - Icon library (FaGithub, FaInstagram, FaStar, etc.)
- `tailwindcss@^4.1.17` - Utility-first CSS framework
- `@tailwindcss/vite@^4.1.17` - Tailwind CSS Vite plugin

**Development Dependencies:**
- `vite@^7.2.2` - Build tool and dev server
- `@vitejs/plugin-react@^5.1.0` - Vite React plugin
- `eslint@^9.39.1` - Code linting
- `eslint-plugin-react-hooks@^5.2.0` - React hooks linting
- `eslint-plugin-react-refresh@^0.4.24` - React refresh linting

**Scripts:**
- `npm run dev` - Start Vite dev server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

---

## 9. MAIN CSS / STYLING APPROACH

### Tailwind CSS First
- **Framework:** Tailwind CSS v4.1.17 with `@tailwindcss/vite` plugin
- **Integration:** via `src/index.css` with `@import "tailwindcss"`
- **Custom Theme:** Defines `--color-dark: #1e253b` for dark mode colors

### CSS Files
- **src/index.css** - Tailwind imports and custom theme variables
- **src/App.css** - Legacy CSS (mostly unused, contains old Vite boilerplate)
- **Dark Mode:** Implemented via `dark:` class prefix with `document.documentElement.classList` toggle in Header

### Styling Strategy
- **Utility-first:** 99% Tailwind utility classes
- **Responsive:** Mobile-first with `md:`, `lg:` breakpoints
- **Dark Mode:** Toggle stored in localStorage, applied to document root
- **Components:** No scoped CSS modules; all classes inline using Tailwind
- **Icons:** `react-icons` library for SVG icons

### Common Utility Patterns
- Flexbox layouts: `flex`, `flex-wrap`, `justify-between`, `items-center`
- Spacing: `m-3`, `p-5`, `my-10`, `px-4`
- Colors: `bg-white`, `dark:bg-gray-800`, `text-gray-900`
- Typography: `text-xl`, `font-bold`, `font-semibold`
- Borders: `border`, `border-gray-200`, `rounded-lg`
- Effects: `shadow`, `shadow-md`, `opacity-50`

---

## 10. DATA FLOW ARCHITECTURE

### Authentication Flow
```
Login.jsx → authService.login()
  ↓
Backend: POST /api/users/login
  ↓
Returns: {user data, sets httpOnly cookie}
  ↓
Header.jsx checks: checkLoggingStatus()
  ↓
Shows DropdownLoggedIn (Dashboard, eBooks, Logout)
```

### Cart Management Flow
```
main.jsx: <CartProvider>
  ↓
CartContext.jsx (useReducer + cartReducer)
  ↓
useCart() available throughout app
  ↓
ProductCard.jsx → addToCart(product)
  ↓
CartContext calls: addToCartAPI(product)
  ↓
Backend: POST /api/cart/addToCart
  ↓
Dispatch: ADD_TO_CART → updates cartList, total
  ↓
CartPage shows updated CartList
```

### Product Discovery Flow
```
HomePage.jsx
  ├── Hero → links to /products
  ├── FeaturedProducts → getFeaturedList()
  └── Testimonials, FAQ

ProductList.jsx → getProductList(searchTerm)
  ├── useFilter() context
  ├── filterReducer applies: sort, rating, stock, best-seller filters
  └── Display: ProductCard components

ProductCard.jsx → ProductDetails.jsx
  ├── useParams() gets :id
  ├── getProduct(id)
  └── useCart() → addToCart() / removeFromCart()
```

### Order Checkout Flow
```
CartPage.jsx
  ↓
CartList → Checkout modal
  ↓
Checkout.jsx → getUser() (verify login)
  ↓
User fills: name, email, address, card
  ↓
placeOrder(cartList)
  ↓
Backend: POST /api/order/placeOrder
  ↓
Success: clearCart() + navigate to /Order-Summary
  ↓
OrderSuccess.jsx or OrderFail.jsx
```

### Dashboard / Order History Flow
```
Dashboardpage.jsx → getUserOrder()
  ↓
Backend: GET /api/order/getUserOrders
  ↓
Returns: [{order1}, {order2}, ...]
  ↓
Map through orders: DashboardCard components
  ↓
Each card shows: order ID, status, date, items, total
```

### Admin Panel Flow
```
Navigate to /admin
  ↓
AdminProtectedRoute checks: adminService.checkAdminStatus()
  ↓
If admin: show AdminPage
  ↓
AdminProductList.jsx → getProductList(searchTerm)
  ↓
Show: table with Edit/Delete buttons
  ↓
Edit → AdminProductForm
  ↓
Submit → Backend API (create/update/delete)
  ↓
Refresh product list
```

### State Management Hierarchy
```
main.jsx
├── BrowserRouter
├── CartProvider (CartContext + cartReducer)
├── FilterProvider (FilterContext + filterReducer)
├── ScrollToTop
├── ToastContainer (for notifications)
└── App.jsx
    ├── Header (checks login status, shows dropdown)
    ├── AllRoutes (route components)
    └── Footer
```

---

## Key Design Patterns

### Provider Pattern
- CartContext and FilterContext wrap entire app at root level
- All children access context via custom hooks (`useCart`, `useFilter`)

### Custom Hook Pattern
- `useTitle()` - Reusable document title setter
- `useCart()` - Access cart state and methods
- `useFilter()` - Access filter state and dispatch

### HOC Pattern
- `AdminProtectedRoute` - Wrapper component that checks admin status before rendering

### API Abstraction
- `apiRequest()` helper centralizes all fetch calls
- Services layer isolates API logic from components
- `transformProduct()`, `transformOrderData()` normalize backend responses

### Local State + Context
- Pages use useState for UI state (loading, modals, etc.)
- Global state (cart, filters) uses Context + useReducer

### Conditional Rendering
- CartPage → CartList | CartEmpty
- Dashboardpage → loading spinner | orders | DashboardEmpty
- Order → OrderSuccess | OrderFail

---

## Project Statistics

- **Total Pages:** 8 main pages
- **Total Components:** 27+ reusable components
- **Custom Hooks:** 1 (useTitle)
- **Context Providers:** 2 (Cart, Filter)
- **Reducers:** 2 (Cart, Filter)
- **Service Files:** 6 (auth, cart, order, product, data, admin)
- **API Endpoints:** 20+ endpoints
- **Routes:** 9 main routes
- **Styling:** Tailwind CSS (utility-first)
