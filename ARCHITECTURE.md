# CodeBook Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         main.jsx (Entry Point)                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ BrowserRouter                                                │   │
│  │ ├── CartProvider (CartContext + cartReducer)                │   │
│  │ ├── FilterProvider (FilterContext + filterReducer)          │   │
│  │ ├── ScrollToTop                                             │   │
│  │ ├── ToastContainer (react-toastify notifications)           │   │
│  │ └── App.jsx                                                 │   │
│  │     ├── Header.jsx                                          │   │
│  │     │   ├── Logo & Navigation                               │   │
│  │     │   ├── Search Component                                │   │
│  │     │   ├── Dark Mode Toggle                                │   │
│  │     │   ├── Cart Icon                                       │   │
│  │     │   └── Dropdown (LoggedIn/LoggedOut)                  │   │
│  │     │                                                        │   │
│  │     ├── AllRoutes.jsx                                       │   │
│  │     │   ├── / → HomePage                                    │   │
│  │     │   ├── /login → Login                                  │   │
│  │     │   ├── /register → Register                            │   │
│  │     │   ├── /products → ProductList                         │   │
│  │     │   ├── /products/:id → ProductDetails                 │   │
│  │     │   ├── /Cart → CartPage                                │   │
│  │     │   ├── /dashboard → Dashboard                          │   │
│  │     │   ├── /Order-Summary → Order                          │   │
│  │     │   └── /admin → AdminPage (Protected)                  │   │
│  │     │                                                        │   │
│  │     └── Footer.jsx                                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════

                          PAGE COMPONENTS
                          
HomePage
├── Hero.jsx (hero banner with CTA)
├── FeaturedProducts.jsx (best-sellers)
├── Testimonials.jsx
└── Faq.jsx (with Accordion components)

ProductList.jsx (with FilterBar.jsx)
├── Filters: sort, ratings, stock, best-seller
└── ProductCard components (grid)

ProductDetails.jsx
├── Product image, name, price, rating
├── Add/Remove from cart
└── Back button

CartPage.jsx
├── CartList.jsx (if items exist)
│   ├── CartCard (per item)
│   ├── Total calculation
│   └── Checkout.jsx (modal form)
└── CartEmpty.jsx (if empty)

Dashboard.jsx
├── DashboardCard (per order)
└── DashboardEmpty.jsx (if no orders)

Order.jsx (read-only summary)
├── OrderSuccess.jsx (if success)
└── OrderFail.jsx (if failed)

AdminPage.jsx
├── AdminProductList.jsx (search, table)
│   ├── Edit → AdminProductForm.jsx
│   └── Add → AdminProductForm.jsx
└── AdminProductForm.jsx (create/edit modal)

═══════════════════════════════════════════════════════════════════════

                      CONTEXT & STATE FLOW

┌─ CartContext ─────────────────────────────────┐
│ State: {cartList, total, loading}             │
│ Reducer: cartReducer                          │
│ Actions: LOAD, ADD, REMOVE, CLEAR, LOADING    │
│ Hook: useCart()                               │
│ Methods:                                      │
│  - addToCart(product)                         │
│  - removeFromCart(product)                    │
│  - clearCart()                                │
│  - loadCart()                                 │
└───────────────────────────────────────────────┘

┌─ FilterContext ────────────────────────────────────┐
│ State: {productList, onlyInStock, bestSellerOnly, │
│         sortBy, ratings}                          │
│ Reducer: filterReducer                            │
│ Actions: PRODUCT_LIST, SORT_BY, RATINGS,         │
│          BEST_SELLER_ONLY, ONLY_IN_STOCK, CLEAR  │
│ Hook: useFilter()                                 │
│ Computed: products (filtered/sorted list)         │
└───────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════

                      API SERVICE LAYER

config/api.js (centralized)
├── getBaseURL() - '/api' in dev, env var in prod
├── apiRequest() - wrapper around fetch
├── handleApiResponse() - error handling
└── Endpoint definitions

Services/
├── productServices.js
│   ├── getProductList(searchTerm)
│   ├── getProduct(id)
│   └── getFeaturedList()
│
├── authService.jsx
│   ├── login(authDetail)
│   ├── register(authDetail)
│   └── logout()
│
├── cartService.js
│   ├── getUserCart()
│   ├── addToCartAPI(product)
│   ├── removeFromCartAPI(product)
│   └── clearCartAPI()
│
├── orderServices.js
│   ├── placeOrder(cartItems)
│   ├── getUserOrder()
│   └── getOrderById(orderId)
│
├── dataService.js
│   ├── getUser()
│   └── checkLoggingStatus()
│
└── adminService.js
    └── checkAdminStatus()

═══════════════════════════════════════════════════════════════════════

                      API ENDPOINTS

Backend: http://localhost:3000/api (dev proxy: /api)

USER ROUTES:
  POST   /users/registerUser
  POST   /users/login
  POST   /users/logOut
  GET    /users/loginStatus
  GET    /users/UserProfile

EBOOK ROUTES:
  GET    /ebook/getAllEbook
  GET    /ebook/singleEbook/:id
  POST   /ebook/createEbook
  PUT    /ebook/updateEbook/:id

CART ROUTES:
  GET    /cart/getUserCart
  POST   /cart/addToCart
  DELETE /cart/removeFromCart
  DELETE /cart/clearCart

ORDER ROUTES:
  POST   /order/placeOrder
  GET    /order/getUserOrders
  GET    /order/getOrderById/:id

═══════════════════════════════════════════════════════════════════════

                    DATA FLOW EXAMPLES

EXAMPLE 1: Add Product to Cart
┌─────────────┐
│ProductCard  │ user clicks "Add to Cart"
└──────┬──────┘
       │ calls addToCart(product)
       ↓
┌──────────────────┐
│useCart()         │ from CartContext
└──────┬───────────┘
       │ triggers addToCartAPI(product)
       ↓
┌──────────────────┐
│cartService.js    │ POST /api/cart/addToCart
└──────┬───────────┘
       │ receives updated cartData
       ↓
┌──────────────────────────┐
│Dispatch ADD_TO_CART      │ via cartReducer
│{cartList, total}         │
└──────┬───────────────────┘
       │
       ↓
┌──────────────────┐
│CartContext state │ updated
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│Re-render         │ ProductCard shows "Remove"
│Components        │ CartPage shows item in list
└──────────────────┘

───────────────────────────────────────────

EXAMPLE 2: Search Products
┌──────────────┐
│Search Input  │ user types "React"
└──────┬───────┘
       │ handleSearch(event)
       ↓
┌──────────────────────┐
│useNavigate()         │ /products?q=React
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ProductList.jsx       │ gets searchTerm from URL
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│getProductList(       │ client-side filtering
│  searchTerm          │
│)                    │
└──────┬───────────────┘
       │ returns filtered products
       ↓
┌──────────────────────┐
│initialProductList()  │ dispatch to FilterContext
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│FilterContext         │ products array updated
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│Re-render             │ ProductList shows matches
│ProductCard grid      │
└──────────────────────┘

───────────────────────────────────────────

EXAMPLE 3: Checkout & Place Order
┌──────────────┐
│CartPage      │
└──────┬───────┘
       │ user clicks "Place Order"
       ↓
┌──────────────────────┐
│Checkout.jsx          │ modal opens
└──────┬───────────────┘
       │ getUser() - verify login
       ↓
┌──────────────────────┐
│dataService.getUser() │ GET /api/users/UserProfile
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│User fills form       │ name, email, address, card
└──────┬───────────────┘
       │ handleOrderSubmit(event)
       ↓
┌──────────────────────┐
│placeOrder(cartList)  │ POST /api/order/placeOrder
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│Order created         │ returns orderData
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│clearCart()           │ DELETE /api/cart/clearCart
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│navigate to           │ /Order-Summary
│Order page            │ {status: true, orderData}
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│OrderSuccess.jsx      │ displays order confirmation
└──────────────────────┘

═══════════════════════════════════════════════════════════════════════

                        COMPONENT TREE

App
├── Header
│   ├── Logo (Link to /)
│   ├── Search (opens Search.jsx)
│   ├── DarkMode Toggle
│   ├── CartIcon (shows count)
│   ├── ProfileIcon → Dropdown
│   │   ├── DropdownLoggedIn (if auth)
│   │   │   ├── Dashboard link
│   │   │   ├── eBooks link
│   │   │   └── Logout button
│   │   └── DropdownLoggedOut (if not auth)
│   │       ├── Login link
│   │       └── Register link
│   └── Footer (social icons)
│
├── HomePage
│   ├── Hero
│   ├── FeaturedProducts (ProductCard × n)
│   ├── Testimonials
│   └── Faq (Accordion × n)
│
├── ProductList
│   ├── FilterBar (drawer - Sort, Rating, Stock)
│   ├── ProductCard × n
│   └── Loading spinner
│
├── ProductDetails
│   ├── Product image
│   ├── Product info
│   ├── Rating component
│   ├── Add/Remove to cart button
│   └── Back button
│
├── CartPage
│   ├── CartList (if items)
│   │   ├── CartCard × n
│   │   ├── Total price
│   │   └── Place Order button → Checkout modal
│   │       ├── Name input
│   │       ├── Email input
│   │       ├── Address input
│   │       ├── Card input
│   │       └── Submit button
│   └── CartEmpty (if no items)
│
├── Dashboard
│   ├── DashboardCard × n (per order)
│   └── DashboardEmpty (if no orders)
│
├── Order (read-only)
│   ├── OrderSuccess (if success)
│   └── OrderFail (if failed)
│
└── AdminPage
    └── AdminProductList
        ├── Search input
        ├── Add Product button
        ├── Product table/list
        │   ├── Edit button → AdminProductForm
        │   └── Delete button
        └── AdminProductForm (modal)
            ├── Name input
            ├── Price input
            ├── Image input
            ├── Description input
            └── Submit/Cancel buttons

═══════════════════════════════════════════════════════════════════════

                      KEY TECHNOLOGIES

Frontend:
  • React 19.2.0 - UI library
  • React Router DOM 7.9.5 - Client-side routing
  • Tailwind CSS 4.1.17 - Styling (utility-first)
  • React Icons 5.5.0 - SVG icons
  • React Toastify 11.0.5 - Notifications
  • Vite 7.2.2 - Build tool & dev server
  • JavaScript ES6+ - Modern syntax

Styling:
  • No CSS modules or scoped styles
  • 99% Tailwind utility classes
  • Dark mode via document classList
  • Responsive design with md:, lg: breakpoints

State Management:
  • React Context API - Global state
  • useReducer - State transitions
  • Custom hooks - State abstraction

API:
  • Fetch API - HTTP requests
  • httpOnly cookies - Authentication
  • Centralized apiRequest() wrapper
  • Vite proxy for /api routes in dev

════════════════════════════════════════════════════════════════════════
