# Lesson 9: Real Server Integration

## Topic
**Complete the full-stack journey** by connecting the lesson app to the **Express + MongoDB backend** (`server/`). This lesson builds on Lesson 7's service-layer pattern and Lesson 8's `main-client` feature parity, replacing `json-server` with the production-style API: JWT cookies, protected routes, and MongoDB persistence.

## Features Introduced in This Lesson
- **Express API integration** — Frontend talks to `/api/users`, `/api/ebook`, `/api/cart`, `/api/order` ✨ NEW
- **JWT httpOnly cookies** — Real login/logout with server-side session validation ✨ NEW
- **Protected endpoints** — Cart, orders, and admin routes require authentication ✨ NEW
- **MongoDB persistence** — Products, users, carts, and orders stored in the database ✨ NEW
- **Vite proxy** — `/api` requests forwarded to `http://localhost:3001` in development ✨ NEW
- **Credentials mode** — `fetch` sends cookies with `credentials: 'include'` ✨ NEW

## Features Carried Forward From Previous Lessons
- Full `main-client` pages: dashboard, order summary, cart checkout, admin CRUD
- Context API (CartProvider, FilterProvider) and reducer patterns
- Service layer architecture from Lesson 7
- All UI components, routing, and styling from Lessons 1–8

## What Changed From Lesson 7 / 8

### Modified Files
- `src/config/api.js` — Endpoint constants for Express API (`/api/users/login`, `/api/ebook/getAllEbook`, etc.) with cookie support
- `src/Services/authService.jsx` — Real login/register/logout against Express
- `src/Services/dataService.js` — `getUser` and `checkLoggingStatus` via server endpoints
- `src/Services/productServices.js` — Fetches from `/api/ebook/*` with field normalization
- `src/Services/cartService.js` — Server-backed cart (`/api/cart/*`)
- `src/Services/orderServices.js` — Place and fetch orders (`/api/order/*`)
- `src/Services/adminService.js` — Admin-only product CRUD with cookie auth
- `vite.config.js` — Proxies `/api` to Express on port 3001
- `package.json` — Updated project name to `code-book-lesson-9`

### Key Difference: json-server vs Express

| Concern | Lesson 7–8 (json-server) | Lesson 9 (Express) |
|---------|--------------------------|-------------------|
| Auth | Email lookup in `/users` | JWT in httpOnly cookie |
| Products | `GET /products` | `GET /api/ebook/getAllEbook` |
| Cart | Email-based `/carts` resource | `POST /api/cart/addToCart` (protected) |
| Orders | `POST /orders` with full body | `POST /api/order/placeOrder` (protected) |
| Admin | No real protection | `adminProtect` middleware on server |

## Project Structure
```
LNine-serverIntegration/
├── src/
│   ├── config/
│   │   └── api.js          ← Express endpoint config + apiRequest helper
│   ├── Services/           ← Same service layer pattern as Lesson 7
│   │   ├── authService.jsx
│   │   ├── productServices.js
│   │   ├── cartService.js
│   │   ├── orderServices.js
│   │   ├── adminService.js
│   │   ├── dataService.js
│   │   └── index.js
│   ├── context/
│   ├── Hooks/
│   ├── Pages/
│   ├── Components/
│   ├── reducers/
│   └── Routes/
├── Data/
│   └── db.json             ← Reference sample data (not used at runtime)
└── package.json
```

## How to Run This Lesson

### Step 1: Start the Express Server
```bash
cd server
npm install
# Create .env with MONGO_URI and JWT_TOKEN (see server README)
npm run dev
```
Server runs at `http://localhost:3001`

### Step 2: Start the React App
```bash
cd frontend/LNine-serverIntegration
pnpm install   # or npm install
pnpm dev       # or npm run dev
```
App runs at `http://localhost:5173`

### Step 3: Test the Application
- Browse products loaded from MongoDB
- Register a new user → stored in database
- Login → JWT cookie set automatically
- Add to cart → persisted on server (login required)
- Checkout → order created, cart cleared
- Admin login → manage products via `/admin`

## API Endpoints Used

### Auth (`/api/users`)
```
POST /registerUser    — Create account
POST /registerAdmin   — Create admin account
POST /login           — Login (sets httpOnly cookie)
POST /logOut          — Logout (clears cookie)
GET  /loginStatus     — Check if logged in
GET  /UserProfile     — Get current user (protected)
```

### Products (`/api/ebook`)
```
GET   /getAllEbook         — All products
GET   /singleEbook/:id     — Single product
POST  /createEbook         — Create (admin only)
PATCH /updateEbook/:id     — Update (admin only)
```

### Cart (`/api/cart`) — all protected
```
GET    /getUserCart
POST   /addToCart
DELETE /removeFromCart
DELETE /clearCart
```

### Orders (`/api/order`) — all protected
```
POST /placeOrder
GET  /getUserOrders
GET  /getOrderById/:id
```

## Flow: User Login with Real Auth

1. User submits login form
2. `authService.login()` → `POST /api/users/login`
3. Server validates credentials, sets `token` httpOnly cookie
4. `loadCart()` fetches cart from `GET /api/cart/getUserCart`
5. User navigates to products or admin (if `isAdmin`)

## Flow: Placing an Order

1. User adds items to cart (server persists each change)
2. User goes to checkout
3. `placeOrder()` → `POST /api/order/placeOrder`
4. Server creates order from user's cart in MongoDB
5. Cart cleared on server
6. User redirected to order summary

## Error Handling

The `apiRequest` helper in `api.js`:
- Sends `credentials: 'include'` for cookie auth
- Parses server error messages from JSON responses
- Shows a clear message if the server is not running

## What You Should See
- ✅ Products load from MongoDB (not `db.json`)
- ✅ Login/register persist users in database
- ✅ Cart syncs with server after login
- ✅ Orders appear in dashboard
- ✅ Admin CRUD requires admin account
- ✅ Reload page → session persists via cookie
- ✅ Network tab shows requests to `/api/*` (proxied to port 3001)

## Debugging Tips

### Check server is running
```bash
curl http://localhost:3001/health
```

### Check products endpoint
```bash
curl http://localhost:3001/api/ebook/getAllEbook
```

### CORS issues
Ensure `http://localhost:5173` is in `server/config/allowedOrigins.js`

### Cookie not sent
Verify `credentials: 'include'` in `apiRequest` and that frontend uses the Vite proxy (`/api` not full URL in dev)

## Reference
- `frontend/main-client/` — Production reference implementation
- `server/` — Express + MongoDB backend
- `frontend/LSeven-jsonServer/` — json-server version (Lesson 7)
- `frontend/LEight-mainClientParity/` — Full UI parity with json-server (Lesson 8)

## Complete Lesson Flow Summary

| Lesson | Focus | Backend |
|--------|-------|---------|
| 7 | Service layer + json-server | json-server (port 3001) |
| 8 | main-client feature parity | json-server (port 3001) |
| 9 | **Real server integration** | **Express + MongoDB (port 3001)** |

By Lesson 9, students have built a complete, production-style full-stack e-book marketplace!
