# CodeBook React Lessons - Complete Guide

A progressive series of 7 fully-functional React applications, each building on the previous one. Each lesson is a **complete, runnable snapshot** of the app at that stage.

---

## 📚 Lesson Overview

### **Lesson 1: Project Structure** (`LOne-structuringTheProjectDirectory/`)
**Topic:** Organizing a React project with folders and components  
**What You'll Learn:** Component hierarchy, project layout, basic Tailwind styling  
**Visual Progress:** ✅ Home page with product gallery

**Key Files:**
- `src/main.jsx` — React entry point
- `src/App.jsx` — Main app wrapper
- `src/Components/Layout/Header.jsx` — Shared header
- `src/Components/Elements/ProductCard.jsx` — Reusable component
- `src/Pages/Home.jsx` — Home page
- `src/data/products.js` — Mock product data

**Tech Stack:** React, Tailwind CSS, Vite

```bash
cd frontend/LOne-structuringTheProjectDirectory
npm install && npm run dev
```

---

### **Lesson 2: Building Components** (`LTwo-buildingTheComponents/`)
**Topic:** Composing reusable components and adding more pages  
**What You'll Learn:** Component composition, props, expanding component library  
**Visual Progress:** ✅ 6 product cards with ratings, Footer, Login/Register/Cart pages (static)

**Changes from Lesson 1:**
- Added `Rating` component with star icons
- Created `Footer` component
- Added `Login`, `Register`, `Cart` pages
- Enhanced `ProductCard` with ratings
- Added `react-icons` for icons

**Key Files:**
- `src/Components/Elements/Rating.jsx` — New
- `src/Components/Layout/Footer.jsx` — New
- `src/Pages/Login.jsx` — New
- `src/Pages/Register.jsx` — New
- `src/Pages/Cart.jsx` — New

**Tech Stack:** React, Tailwind CSS, react-icons, Vite

```bash
cd frontend/LTwo-buildingTheComponents
npm install && npm run dev
```

---

### **Lesson 3: Routing & Navigation** (`LThree-routingAndNavigation/`)
**Topic:** Client-side routing with React Router  
**What You'll Learn:** Routes, Links, SPA navigation, URL handling  
**Visual Progress:** ✅ Navigation between all 4 pages using header links, dynamic URLs

**Changes from Lesson 2:**
- Added `react-router-dom` for client-side routing
- Created `src/Routes/AllRoutes.jsx` with 4 routes
- Updated `Header` with navigation links
- Wrapped app in `BrowserRouter`
- Pages are now dynamically rendered based on URL

**Key Files:**
- `src/Routes/AllRoutes.jsx` — New
- `src/main.jsx` — Updated with BrowserRouter
- `src/Components/Layout/Header.jsx` — Updated with links
- `src/App.jsx` — Updated to use AllRoutes

**Tech Stack:** React, React Router, Tailwind CSS, Vite

```bash
cd frontend/LThree-routingAndNavigation
npm install && npm run dev
# Click header links to navigate between Home, Login, Register, Cart
```

---

### **Lesson 4: Custom Hooks** (`LFour-customHooks/`)
**Topic:** Extracting shared logic into custom hooks  
**What You'll Learn:** Custom hooks, useEffect, hook composition  
**Visual Progress:** ✅ Browser tab title changes as you navigate pages

**Changes from Lesson 3:**
- Created `src/Hooks/useTitle.js` custom hook
- Updated all pages to call `useTitle()` with page-specific titles
- Hook updates document.title on mount/change

**Key Files:**
- `src/Hooks/useTitle.js` — New

**Tech Stack:** React, React Router, Tailwind CSS, Vite

```bash
cd frontend/LFour-customHooks
npm install && npm run dev
# Watch the browser tab title change as you navigate
```

---

### **Lesson 5: Context API** (`LFive-contextAPI/`)
**Topic:** Global state management with React Context  
**What You'll Learn:** Context, useReducer, Provider pattern, global state  
**Visual Progress:** ✅ Working shopping cart! Add items to cart, see count in header update, view cart contents

**Changes from Lesson 4:**
- Created `src/context/CartContext.jsx` with Provider
- Created `src/context/FilterContext.jsx` for filters
- Created `src/reducers/cartReducer.js` for cart state logic
- Updated `Header` to show cart item count
- Updated `ProductCard` with "Add to Cart" button
- Updated `Cart` page to display items and total
- Wrapped app in `CartProvider` and `FilterProvider`

**Key Files:**
- `src/context/CartContext.jsx` — New
- `src/context/FilterContext.jsx` — New
- `src/reducers/cartReducer.js` — New
- `src/Services/cartService.js` — New (mock)

**Tech Stack:** React Context, useReducer, React Router, Tailwind CSS, Vite

```bash
cd frontend/LFive-contextAPI
npm install && npm run dev
# Click cart icons on products to add to cart
# Watch cart count update in header in real-time
# Navigate to /cart to see all items and total
```

---

### **Lesson 6: Redux State Management** (`LSix-reduxStateManagement/`)
**Topic:** Alternative state management with Redux  
**What You'll Learn:** Redux, store, actions, reducers, useSelector/useDispatch  
**Visual Progress:** ✅ Identical to Lesson 5 visually, but powered by Redux

**Changes from Lesson 5:**
- Replaced React Context with Redux
- Created `src/store/index.js` with Redux store
- Created `src/store/actions.js` with action creators
- Updated components to use `useSelector` and `useDispatch`
- Removed CartProvider and FilterProvider

**Key Files:**
- `src/store/index.js` — New
- `src/store/actions.js` — New
- `package.json` — Added redux and react-redux

**Tech Stack:** Redux, react-redux, React Router, Tailwind CSS, Vite

```bash
cd frontend/LSix-reduxStateManagement
npm install && npm run dev
# Functionally identical to Lesson 5, but using Redux internally
# Install Redux DevTools browser extension for time-travel debugging
```

---

### **Lesson 7: JSON-RPC Server** (`LSeven-jsonRpcServer/`)
**Topic:** Full-stack integration with JSON-RPC backend server  
**What You'll Learn:** Backend integration, JSON-RPC protocol, client-server communication  
**Visual Progress:** ✅ Complete working app with real backend server

**Changes from Lesson 5** (Note: Returns to Context API, skips Redux):
- Created `jsonRpcClient.js` — JSON-RPC protocol client
- Updated `productServices.js` to call server via JSON-RPC
- Updated `cartService.js` to call server via JSON-RPC
- Configured Vite proxy for `/rpc` endpoint
- Created `jsonRpc-server/` folder with Node.js server
- Server implements: getProducts, addToCart, getCart, etc.

**Key Files:**
- `src/Services/jsonRpcClient.js` — New
- `vite.config.js` — Updated with proxy
- `../jsonRpc-server/server.js` — New backend

**Frontend Tech Stack:** React Context, React Router, Tailwind CSS, Vite  
**Backend Tech Stack:** Node.js HTTP, JSON-RPC 2.0

```bash
# Terminal 1 - Frontend
cd frontend/LSeven-jsonRpcServer
npm install
npm run dev

# Terminal 2 - Backend (in another terminal)
cd frontend/jsonRpc-server
npm start
# Server listens on http://localhost:4000/rpc
```

---

## 🎯 How to Use These Lessons

### Run Any Lesson Individually
Each lesson folder is **completely self-contained**. To run Lesson 3, for example:

```bash
cd frontend/LThree-routingAndNavigation
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Compare Lessons
The cumulative nature means each lesson includes everything from prior lessons plus one new concept:
- L1: Just pages + components
- L2: L1 + Rating component + Footer
- L3: L2 + React Router for navigation
- L4: L3 + useTitle custom hook
- L5: L4 + Context API for global state
- L6: L5 + Redux (alternative to Context)
- L7: L5 + JSON-RPC server (returns to Context, not Redux)

### Understand Progression
To see how a feature is built, follow it across lessons:
- **Cart feature**: Introduced in L5 (Context), reimplemented in L6 (Redux), real backend in L7
- **Pages**: Introduced in L2, navigable in L3, titled in L4, state-aware in L5+
- **Styling**: Consistent Tailwind across all lessons
- **Components**: Built incrementally and reused throughout

---

## 📋 Comparison Matrix

| Feature | L1 | L2 | L3 | L4 | L5 | L6 | L7 |
|---------|----|----|----|----|----|----|-----|
| Basic components | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ProductCard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Rating component | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Footer | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Login/Register/Cart pages | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Routing** | — | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Custom hooks** | — | — | — | ✅ | ✅ | ✅ | ✅ |
| **Context API** | — | — | — | — | ✅ | — | ✅ |
| **Redux** | — | — | — | — | — | ✅ | — |
| **Backend server** | — | — | — | — | — | — | ✅ |
| **Add to cart** | — | — | — | — | ✅ | ✅ | ✅ |
| **Cart persistence** | — | — | — | — | ✅ | ✅ | ✅ |

---

## 🔗 Reference: main-client

The `frontend/main-client/` folder is the **production version** these lessons build toward. It includes:
- All 8 pages (Home, Login, Register, ProductList, ProductDetails, Cart, Dashboard, Admin)
- 27+ components organized by purpose
- Complete service layer with 6 services and 20+ API endpoints
- Two context providers (Cart, Filter) with full reducers
- Custom hooks (useTitle)
- Protected routes for admin
- Real backend API integration

Compare Lesson 7 with main-client to see additional features:
- More product pages and details
- User authentication & dashboard
- Admin product management
- Order processing
- Filtering and search

---

## 📝 Each Lesson's README

Each lesson folder includes a detailed `README.md` explaining:
- **What Changed** — New files/features vs. previous lesson
- **Key Concepts** — What you're learning
- **Why** — Why these changes matter
- **What You Should See** — Visible progress when you run it
- **How to Run** — Commands to start
- **Next Lesson** — What's coming

---

## 🚀 Learning Path Recommendations

### **For Beginners**
Start at Lesson 1 and progress sequentially:
1. Understand folder structure (L1)
2. Build components (L2)
3. Add routing (L3)
4. Extract logic with hooks (L4)
5. Manage state with Context (L5)

Then explore Lesson 6 (Redux) as an alternative approach.

### **For Intermediate Developers**
- Skip L1-L2, start at L3 if comfortable with components
- Focus on L4-L5 (hooks and Context)
- Use L6 to see Redux patterns
- Jump to L7 for full-stack integration

### **For Advanced Developers**
- Review L7 to understand the cumulative architecture
- Compare L7 with main-client to see production additions
- Modify lessons to add new features (e.g., add authentication in L5)

---

## 🐛 Troubleshooting

### Dependencies not installing
```bash
npm install
# or
rm -rf node_modules && npm install
```

### Port already in use
If port 5173 is taken:
```bash
npm run dev -- --port 5174
```

### JSON-RPC Server (L7) not connecting
Make sure to run server in a separate terminal:
```bash
cd frontend/jsonRpc-server
npm start
# Should print: JSON-RPC Server listening on http://localhost:4000/rpc
```

---

## 📚 Key Technologies

- **React 19.2.0** — UI framework
- **Vite 7.2.2** — Build tool (fast dev server)
- **Tailwind CSS 4.1** — Utility-first styling
- **React Router 7.9** — Client-side routing
- **React Icons 5.5** — Icon library
- **Redux** (Lesson 6) — State management
- **Node.js** (Lesson 7) — Backend server

---

## 🎓 What You'll Learn

✅ React fundamentals and component-based architecture  
✅ Folder structure and project organization  
✅ Client-side routing with React Router  
✅ Custom hooks for reusable logic  
✅ Global state management (Context + useReducer)  
✅ Alternative state management (Redux)  
✅ Backend integration and JSON-RPC protocol  
✅ Full-stack application development  
✅ Tailwind CSS for modern styling  

---

## 📄 License

These lessons are part of the CodeBook project. Free to use for learning purposes.

---

**Happy Learning! 🚀**

Start with Lesson 1, run it locally, understand it, then move to Lesson 2. Each lesson takes ~30 minutes to understand, and by Lesson 7, you'll have built a complete React app from scratch.
