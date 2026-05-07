# Lesson 7: json-server Integration

## Topic
**Complete backend integration** using **json-server**. Replacing all hardcoded data with real API calls. Building a complete full-stack application where frontend and backend communicate seamlessly. Students learn how frontend applications integrate with RESTful backends.

## Features Introduced in This Lesson
- **API Service Layer** — Centralized service files for API communication ✨ NEW
- **Fetch from json-server** — Real data persistence in database ✨ NEW
- **RESTful Endpoints** — GET, POST, PUT, DELETE operations ✨ NEW
- **Error Handling** — Graceful fallback when API fails ✨ NEW
- **Authentication Flow** — Real login/logout with backend validation ✨ NEW
- **Product CRUD** — Admin can create/update/delete products in database ✨ NEW
- **Order Management** — Save and retrieve orders from database ✨ NEW
- **User Management** — Register and authenticate users ✨ NEW

## Features Carried Forward From Previous Lessons
- All advanced features (admin dashboard, protected routes)
- All Context API functionality
- All custom hooks and state management
- All components and pages
- Dark mode and responsive design

## What Changed From the Previous Lesson

### New Files Created
- `src/Services/productServices.js` — Product API calls ✨ NEW
- `src/Services/adminService.js` — Admin API calls ✨ NEW
- `src/Services/authService.jsx` — Authentication API calls ✨ NEW
- `src/Services/cartService.js` — Cart API calls ✨ NEW
- `src/Services/dataService.js` — General data API calls ✨ NEW
- `src/Services/orderServices.js` — Order API calls ✨ NEW

### Modified Files
- `src/config/api.js` — Now contains apiRequest helper for json-server
- `src/Pages/Home/HomePage.jsx` — Fetches data from API
- `src/Pages/Products/ProductList.jsx` — Fetches data from API
- `src/Pages/ProductDetails.jsx` — Fetches single product from API
- `src/Pages/Admin/AdminPage.jsx` — Uses admin service for CRUD operations
- `src/Pages/Login.jsx` — Uses auth service for login
- `src/Pages/Register.jsx` — Uses auth service for registration
- `package.json` — Updated project name to "code-book-lesson-7"

## Key Concepts Introduced
- **API Architecture** — Separating API calls into service files
- **RESTful API** — Understanding HTTP methods and status codes
- **Error Handling** — Try/catch blocks and fallback data
- **Service Layer Pattern** — Abstracting API logic from components
- **Database Persistence** — json-server storing and retrieving data
- **Full-Stack Development** — Frontend calling backend endpoints
- **Development Environment Setup** — Running multiple servers

## Why These Changes Were Made
API integration is crucial because it:
1. **Enables Persistence** — Data survives page refreshes and browser restarts
2. **Scales the Application** — Backend handles business logic and validation
3. **Separates Concerns** — Frontend focuses on UI, backend on data
4. **Mirrors Production** — Real applications always use APIs
5. **Enables Collaboration** — Frontend and backend teams work independently
6. **Provides Security** — Backend can validate and protect data

## Project Structure
```
LSeven-jsonServer/
├── src/
│   ├── config/
│   │   └── api.js ✨ UPDATED - apiRequest helper
│   ├── Services/
│   │   ├── productServices.js ✨ NEW
│   │   ├── adminService.js ✨ NEW
│   │   ├── authService.jsx ✨ NEW
│   │   ├── cartService.js ✨ NEW
│   │   ├── dataService.js ✨ NEW
│   │   └── orderServices.js ✨ NEW
│   ├── Pages/
│   │   ├── Home/HomePage.jsx (fetches from API)
│   │   ├── Products/ProductList.jsx (fetches from API)
│   │   ├── ProductDetails.jsx (fetches from API)
│   │   ├── Admin/AdminPage.jsx (uses admin service)
│   │   ├── Login.jsx (uses auth service)
│   │   ├── Register.jsx (uses auth service)
│   │   └── ...
│   ├── context/
│   ├── Hooks/
│   ├── Components/
│   └── ...
└── package.json
```

## API Service Files Overview

### productServices.js
```javascript
// Fetch all products
getProducts() → GET /products

// Fetch single product by ID
getProduct(id) → GET /products/{id}

// Fetch bestseller products
getProductsBestseller() → GET /products?best_seller=true

// Fetch products by multiple IDs
getProductsByIds(ids) → GET /products?id=10001&id=10002
```

### adminService.js
```javascript
// Fetch all products (admin view)
getAdminProducts() → GET /products

// Create new product
createProduct(product) → POST /products

// Update existing product
updateProduct(id, product) → PUT /products/{id}

// Delete product
deleteProduct(id) → DELETE /products/{id}
```

### authService.jsx
```javascript
// Login user
loginUser(email, password) → Finds user in /users, validates password

// Register new user
registerUser(name, email, password) → POST /users with new user

// Verify token (placeholder)
verifyToken(token) → Check JWT validity
```

### orderServices.js
```javascript
// Fetch all orders
getOrders() → GET /orders

// Fetch single order
getOrder(id) → GET /orders/{id}

// Create new order
createOrder(order) → POST /orders

// Fetch user's orders by email
getOrdersByUser(email) → GET /orders?email={email}
```

### cartService.js
```javascript
// Save user's cart to backend
saveCart(email, cartData) → POST /carts

// Retrieve user's cart
getCart(email) → GET /carts?email={email}
```

### dataService.js
```javascript
// Fetch home page data
getHome() → GET /featured_products

// Fetch slider/bestseller products
getHomeSlider() → GET /products?best_seller=true

// Fetch all products
getAllProducts() → GET /products
```

## api.js Configuration
```javascript
const apiRequest = async (url, options = {}) => {
  const response = await fetch(`http://localhost:3001${url}`, {
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Usage in components:
const products = await apiRequest("/products");
const newProduct = await apiRequest("/products", {
  method: "POST",
  body: JSON.stringify(product)
});
```

## How to Run This Lesson

### Step 1: Start json-server
```bash
# In a new terminal in the frontend/LSeven-jsonServer directory
npm install json-server --save-dev

# Run json-server with db.json
npx json-server --watch Data/db.json --port 3001
```

### Step 2: Start the React App
```bash
# In another terminal
npm install
npm run dev
```

### Step 3: Test the Application
- Visit http://localhost:5173/
- Homepage fetches featured products from json-server
- Products page shows all products from database
- Click "Add to Cart" (works with Context API)
- Login with any email (backend validates in Lesson 8)
- Visit /admin to manage products
- Create/Edit/Delete products - changes saved to json-server db.json

## db.json Structure
```json
{
  "products": [
    {
      "id": 10001,
      "name": "Basics To Advanced In React",
      "price": 29,
      "rating": 5,
      "poster": "https://...",
      "in_stock": true,
      "best_seller": true,
      "overview": "Learn React from basics to advanced",
      "long_description": "Complete React course...",
      "size": "5GB"
    }
  ],
  "featured_products": [...],
  "orders": [
    {
      "id": 1234567890,
      "email": "user@example.com",
      "items": [...],
      "total": 99.99,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "isAdmin": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "carts": []
}
```

## Flow: Adding Product via Admin

1. Admin logs in (email/password saved to localStorage)
2. Admin visits `/admin` route
3. AdminProtectedRoute checks `adminUser` flag
4. Admin fills product form and clicks "Add Product"
5. `handleAddProduct` calls `createProduct()` from adminService
6. `createProduct()` calls `apiRequest("/products", { method: "POST", ... })`
7. json-server receives POST request
8. New product saved to db.json
9. Toast confirms success
10. AdminProductList refreshes with new product
11. All other pages see updated product list

## Flow: User Browsing Products

1. User visits HomePage
2. `useEffect` calls `getProductsBestseller()`
3. `getProductsBestseller()` calls `apiRequest("/products?best_seller=true")`
4. json-server returns all bestseller products
5. `setProductList()` updates FilterContext
6. ProductCard components render with real data
7. User clicks product to see details
8. ProductDetails page calls `getProduct(id)`
9. Single product data fetched and displayed

## Error Handling Pattern
```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getProducts(); // Throws error if status not ok
      setProductList(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
      toast.error("Failed to load products");
      // Optional: Use fallback data
      setProductList(fallbackData);
    }
  };
  
  fetchData();
}, []);
```

## Differences from Previous Lessons

### Lesson 6 (Advanced Features - No API)
```javascript
// Admin adds product
const sampleProducts = [...]; // Hardcoded in memory
toast.success("Product added!"); // Not persisted
// Reload page → Product gone
```

### Lesson 7 (json-server Integration)
```javascript
// Admin adds product
const newProduct = await createProduct(formData); // Sent to API
// json-server saves to db.json
toast.success("Product added!"); // Persisted
// Reload page → Product still there!
```

## Advantages of This Architecture

### Separation of Concerns
```
Components (UI)
    ↓
Hooks (Logic)
    ↓
Services (API)
    ↓
Backend (json-server)
```

### Reusability
```javascript
// authService can be imported in multiple components
import { loginUser } from "../Services/authService";

// Multiple pages can use same service
const user = await loginUser(email, password);
```

### Easy Testing
```javascript
// Services can be mocked for unit tests
jest.mock("../Services/productServices");
// Components tested independently
```

### Easy Backend Migration
```javascript
// When switching from json-server to real backend:
// Only change service files, components stay same!
export const getProducts = async () => {
  return await apiRequest("https://production-api.com/products");
};
```

## What You Should See

### After Running Both Servers
- ✅ Homepage with real products from database
- ✅ Products page loads all 12+ books from db.json
- ✅ Filter/sort works on real data
- ✅ Add to cart with working cart badge
- ✅ View cart with persisted items
- ✅ Admin dashboard functional
- ✅ Create product → saved to database
- ✅ Edit product → changes persist
- ✅ Delete product → removed from database
- ✅ Reload page → all data restored from json-server
- ✅ Error handling shows fallback if server down

## Debugging Tips

### Check if json-server is running
```bash
# Should return all products
curl http://localhost:3001/products

# Should return specific product
curl http://localhost:3001/products/10001
```

### Monitor Network Requests
- Open DevTools → Network tab
- All requests to `localhost:3001` visible
- Check request/response payloads
- Verify status codes (200, 201, 204, etc.)

### Test API Manually
```javascript
// In browser console:
const response = await fetch('http://localhost:3001/products');
const data = await response.json();
console.log(data);
```

## Next Steps: Production Deployment

After mastering this lesson, students should understand:
- How frontend calls backend
- How RESTful APIs work
- How services organize API logic
- How to handle errors gracefully
- How to persist data

This foundation prepares for:
- Real backend frameworks (Node.js, Django, etc.)
- Database design (PostgreSQL, MongoDB, etc.)
- Authentication/Authorization
- Security best practices
- Performance optimization

## Reference
See `frontend/main-client/` for the full production version of this project.

## Complete Lesson Flow Summary

| Lesson | Focus | Data Source | Persistence |
|--------|-------|-------------|-------------|
| 1 | Setup | N/A | N/A |
| 2 | Components | Hardcoded | None |
| 3 | Routing | Hardcoded | None |
| 4 | Custom Hooks | Hardcoded | None |
| 5 | Context API | Hardcoded | localStorage |
| 6 | Admin Panel | Hardcoded | localStorage |
| 7 | **json-server** | **API/Database** | **Persistent DB** |

By Lesson 7, students have built a complete, full-stack e-book marketplace with real data persistence!

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
