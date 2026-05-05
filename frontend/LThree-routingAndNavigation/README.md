# LThree-routingAndNavigation

## Topic
Client-side routing with React Router to switch between pages without reload.

## What Changed From Previous Lesson
✅ Added **react-router-dom** dependency  
✅ Wrapped app in **BrowserRouter** in main.jsx  
✅ Created **AllRoutes** component defining all routes  
✅ Updated **Header** with navigation links (Home, Login, Register, Cart)  
✅ Updated **App.jsx** to render routes  
✅ Added cross-links in Login → Register and Register → Login  

## Key Concepts Introduced
- Browser routing and URL-based navigation
- `<Routes>` and `<Route>` elements
- `<Link>` component for navigation
- SPA (Single Page App) behavior—no server requests for navigation

## Why These Changes Were Made
Without routing, we had static pages sitting in the code unused. React Router lets us:
- Navigate to different pages by URL path (`/`, `/login`, `/cart`, etc.)
- Update the browser address bar as users navigate
- Share links (e.g., `https://codebook.local/cart`)
- Maintain app state across navigation

## What You Should See When You Run This
✓ Header now has navigation links (Home, Login, Register, Cart)  
✓ Click "Login" → see the login form  
✓ Click "Register" → see the registration form  
✓ Click "Home" → back to product gallery  
✓ Click "Cart" → empty cart page  
✓ **Browser address bar updates** (e.g., `/login`, `/cart`)  
✓ No page reload—smooth transitions between pages  
✓ Links in forms work (e.g., "Create Account" → Register page)  

## How to Run
```bash
npm install
npm run dev
```

Navigate between pages using the header links.

## Next Lesson
In Lesson 4, we'll extract common logic into **custom hooks** (like `useTitle` to set document title on each page).
