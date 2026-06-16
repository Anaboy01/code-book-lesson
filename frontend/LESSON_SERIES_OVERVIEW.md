# CodeBook React Lesson Series - Complete Overview

## Project Summary
A **cumulative 9-lesson React course** that transforms students from zero to full-stack using modern React patterns. Each lesson is a complete, runnable project that adds new features progressively. By Lesson 9, students have built a fully functional e-book marketplace with frontend, real backend integration, and admin functionality.

## Quick Start Guide

### Run Any Lesson Locally
```bash
cd frontend/LOne-structuringTheProjectDirectory  # or L2, L3, etc.
npm install
npm run dev
```
App available at: `http://localhost:5173/`

### Run Lesson 7 or 8 with json-server
```bash
# Terminal 1: Start json-server
cd frontend/LSeven-jsonServer   # or LEight-mainClientParity
npx json-server --watch Data/db.json --port 3001

# Terminal 2: Start React app
npm install
npm run dev
```

### Run Lesson 9 with Express Server
```bash
# Terminal 1: Start Express + MongoDB backend
cd server
npm install
npm run dev

# Terminal 2: Start React app
cd frontend/LNine-serverIntegration
npm install
npm run dev
```

## Lesson Breakdown

### ✅ Lesson 1: Structuring the Project Directory
**Focus**: Project setup and folder architecture  
**Key Topics**:
- Vite + React + Tailwind setup
- Project folder structure
- Configuration files (vite.config.js, tailwind.config.js, eslint)
- Initial database structure (db.json with 12 products)

**Student Outcome**: Can create a production-ready React project scaffold from scratch

---

### ✅ Lesson 2: Building the Components
**Focus**: UI components and reusable elements  
**Key Components Created**:
- Header (with dark mode toggle, search, cart icon)
- Footer (multi-column layout)
- Rating (star display based on rating)
- ProductCard (product preview with image, name, rating, price)
- HomePage (featured products grid)
- ProductList (all products with filter menu)

**Student Outcome**: Can build reusable, responsive React components with Tailwind CSS

---

### ✅ Lesson 3: Routing and Navigation
**Focus**: Multi-page application with React Router  
**Routes Added**:
- `/` → HomePage
- `/products` → ProductList
- `/products/:id` → ProductDetails (hardcoded sample data)
- `/login` → Login (form only, no auth)
- `/register` → Register (form with validation)
- `/cart` → CartPage (empty state)

**Student Outcome**: Can build multi-page SPAs with React Router and dynamic routing

---

### ✅ Lesson 4: Custom Hooks
**Focus**: Logic extraction and hook composition  
**Hooks Created**:
- `useTitle` — Sets page title in browser tab
- `useCart` — Cart state management (add, remove, clear)
- `useFilter` — Product filtering with sort/stock/rating/bestseller logic

**Features**:
- Filter UI with checkboxes, dropdowns, clear button
- memoized filtering logic with useMemo
- useCallback for optimized functions

**Student Outcome**: Can create custom hooks to encapsulate and reuse stateful logic

---

### ✅ Lesson 5: Context API
**Focus**: Global state management without prop drilling  
**Context Created**:
- CartContext with CartProvider — Global cart state
- FilterContext with FilterProvider — Global filter state

**Integration Points**:
- Header displays real cart count badge
- ProductCard calls addToCart from context
- CartPage displays cart items with remove/clear buttons
- localStorage persists cart across refreshes

**Student Outcome**: Can manage global state with React Context API and useReducer

---

### ✅ Lesson 6: Advanced Features
**Focus**: Admin functionality and protected routes  
**Components Created**:
- AdminProtectedRoute — Route protection based on localStorage flag
- AdminPage — Tabbed admin dashboard
- AdminProductForm — CRUD form for products
- AdminProductList — Table view with edit/delete actions

**Features**:
- Demo login (any email grants admin access)
- Product management (add, edit, delete)
- Form validation with toast feedback
- Tab navigation

**Student Outcome**: Can implement admin functionality with protected routes and role-based access

---

### ✅ Lesson 7: json-server Integration
**Focus**: Full-stack development with API integration  
**Service Files Created**:
- `productServices.js` — GET product endpoints
- `adminService.js` — CRUD operations for products
- `authService.jsx` — Login/register/token validation
- `cartService.js` — Cart persistence to backend
- `dataService.js` — Home/featured product data
- `orderServices.js` — Order management endpoints

**Features**:
- All pages fetch from json-server (localhost:3001)
- Admin CRUD operations persist to db.json
- Error handling with fallback data
- Service layer pattern for API organization

**Student Outcome**: Can build full-stack applications with frontend/backend integration

---

### ✅ Lesson 8: main-client Feature Parity (json-server)
**Focus**: Complete the UI and flows from the production `main-client` while keeping json-server  
**Key Additions**:
- Dashboard, order summary, checkout, and home page subcomponents
- Search, filter bar, scroll-to-top, and dropdown navigation
- Service layer updates for cart/order/auth parity with `main-client` contracts
- json-server resources for users, carts, and orders

**Student Outcome**: Can migrate a reference app to a mock API while preserving UI contracts

---

### ✅ Lesson 9: Real Server Integration (Express + MongoDB)
**Focus**: Replace json-server with the production Express backend  
**Key Changes**:
- `api.js` — Express endpoints (`/api/users`, `/api/ebook`, `/api/cart`, `/api/order`)
- JWT httpOnly cookie authentication (`credentials: 'include'`)
- Protected cart, order, and admin routes
- MongoDB persistence via `server/`
- Same service layer and file structure pattern as Lesson 7

**Student Outcome**: Can connect a React frontend to a real Node.js/Express API with authentication

---

## Technology Stack

### Frontend
- **React 19.2.0** — UI library
- **React Router 7.9.5** — Routing
- **Vite 7.2.2** — Build tool
- **Tailwind CSS 4.1.17** — Styling
- **React Icons 5.5.0** — Icon library
- **React Toastify 11.0.5** — Toast notifications

### Backend
- **json-server** — Mock REST API (Lessons 7–8)
- **Express + MongoDB** — Production-style API (Lesson 9, `server/`)

### Development
- **ESLint** — Code quality
- **Proxy config** — /api requests to json-server

---

## Key Patterns & Concepts

### State Management Evolution
```
L1-3: No state (hardcoded data)
  ↓
L4: Local component state + custom hooks
  ↓
L5: Global state with Context API
  ↓
L6-8: Full-stack with json-server persistence
  ↓
L9: Full-stack with Express + MongoDB
```

### Data Flow Pattern
```
Component → Custom Hook → Context (Global State) → Component
                              ↓
                         json-server (L7-8) or Express (L9)
```

### File Organization
```
src/
├── Components/        (Reusable UI)
├── Pages/            (Route pages)
├── Hooks/            (Custom hooks)
├── context/          (Global state)
├── Services/         (API calls - L7)
├── config/           (Configuration)
├── reducers/         (State logic)
└── Routes/           (Route definitions)
```

---

## Feature Matrix

| Feature | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 |
|---------|----|----|----|----|----|----|----|----|-----|
| UI Components | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Routing | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dark Mode | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Product Filtering | - | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Shopping Cart | - | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Authentication | - | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin Panel | - | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| Dashboard/Orders | - | - | - | - | - | - | - | ✓ | ✓ |
| Data Persistence | - | - | - | - | ✓ (local) | ✓ (local) | ✓ (json) | ✓ (json) | ✓ (MongoDB) |
| API Integration | - | - | - | - | - | - | ✓ | ✓ | ✓ |
| Real JWT Auth | - | - | - | - | - | - | - | - | ✓ |

---

## Learning Outcomes by Lesson

### Lesson 1
- [ ] Set up Vite + React project
- [ ] Configure Tailwind CSS and ESLint
- [ ] Create folder structure
- [ ] Understand project architecture

### Lesson 2
- [ ] Build reusable React components
- [ ] Implement responsive design with Tailwind
- [ ] Use React Icons
- [ ] Create component props and composition

### Lesson 3
- [ ] Use React Router for multi-page apps
- [ ] Implement useParams for dynamic routing
- [ ] Create navigation with Link component
- [ ] Build form pages (login, register)

### Lesson 4
- [ ] Create custom hooks
- [ ] Use useMemo for performance
- [ ] Use useCallback for function memoization
- [ ] Implement complex filtering logic

### Lesson 5
- [ ] Understand Context API
- [ ] Create Context providers
- [ ] Use useContext hook
- [ ] Implement useReducer for state management
- [ ] Persist state to localStorage

### Lesson 6
- [ ] Create protected routes
- [ ] Implement role-based access control
- [ ] Build admin dashboard
- [ ] Implement CRUD operations (UI only)
- [ ] Use form validation

### Lesson 7
- [ ] Create API service layer
- [ ] Use fetch API and json-server
- [ ] Implement error handling
- [ ] Handle async/await operations
- [ ] Understand RESTful principles
- [ ] Build full-stack applications

### Lesson 8
- [ ] Achieve main-client feature parity
- [ ] Preserve service contracts when swapping backends
- [ ] Model users, carts, and orders in json-server

### Lesson 9
- [ ] Connect to Express + MongoDB backend
- [ ] Use JWT httpOnly cookies for authentication
- [ ] Configure Vite proxy for `/api` requests
- [ ] Work with protected API routes
- [ ] Migrate from mock API to production-style server

---

## Important Notes

### Key Principle
**"Each lesson is a complete, working application."** No regressions—everything from previous lessons works perfectly in subsequent lessons.

### Backend Progression
- **Lessons 7–8**: Use **json-server** (with `db.json`) to teach API concepts with zero backend setup.
- **Lesson 9**: Switch to the **Express + MongoDB** server in `server/` for production-style auth and persistence.

### Fallback Data
Each lesson includes fallback hardcoded data. If json-server isn't running (in L7), the app still works with sample data.

---

## Troubleshooting

### App won't start
```bash
npm install
rm -rf node_modules package-lock.json
npm install again
```

### Tailwind CSS not working
- Ensure `index.css` has `@import "tailwindcss"`
- Check `tailwind.config.js` includes template paths
- Rebuild with `npm run dev`

### json-server errors (Lesson 7)
```bash
# Make sure db.json exists and has valid JSON
# Verify json-server running on port 3001
npx json-server --watch Data/db.json --port 3001

# Check other ports aren't using 3001
lsof -i :3001
```

### Components not updating
- Check Context providers are in main.jsx
- Verify useContext is called inside provider
- Ensure reducer functions return new state

---

## Project References

- **main-client/**: Full production-ready reference implementation
- **Data/db.json**: Sample database with 12 products, orders, users

---

## Teacher Notes

### Teaching Tips
1. **Run each lesson sequentially** — Each builds on the previous
2. **Have students compare code** — Show diff between lessons
3. **Let students practice** — Don't just read, have them code
4. **Debug together** — Use DevTools console, Network tab
5. **Discuss trade-offs** — Why Context instead of Redux? Why json-server?

### Common Student Mistakes
- Forgetting to wrap app with providers (Lesson 5)
- Not using useCallback/useMemo correctly (Lesson 4)
- Trying to access localStorage without checking (Lesson 5-6)
- Not starting json-server before using API (Lesson 7)

### Time Estimates
- L1: 30-45 min (setup)
- L2: 60-90 min (component building)
- L3: 45-60 min (routing)
- L4: 90-120 min (hooks, filtering)
- L5: 60-90 min (context API)
- L6: 75-100 min (admin dashboard)
- L7: 90-120 min (json-server integration)
- L8: 60-90 min (main-client parity)
- L9: 90-120 min (Express server integration)

**Total**: ~12-15 hours of structured, project-based React learning

---

## Next Steps After Lesson 9

Students can extend the project with:
- Payment processing (Stripe)
- Email notifications
- Image upload
- Search functionality
- User dashboards
- Order history
- Wishlist
- Reviews/ratings
- Deployment (Vercel, Netlify)

---

## Questions?

Refer to individual lesson README files for detailed explanations of features and architecture.
