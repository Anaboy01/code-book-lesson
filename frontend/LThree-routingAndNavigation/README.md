# LThree-routingAndNavigation

## Topic
React Router and navigation for a lesson project.

## What Changed From the Previous Lesson
This lesson adds routing and navigation to connect the home page, product details, and cart page.

### New Files
- `src/Routes/AllRoutes.jsx` — route definitions for the app.
- `src/Pages/ProductDetails.jsx` — product detail page rendered by the router.
- `src/Components/other/ScrollToTop.jsx` — route-aware scroll restoration.

### Modified Files
- `src/main.jsx` — added BrowserRouter.
- `src/App.jsx` — swapped the home-only layout for routes.
- `src/Components/Layout/Header.jsx` — added navigation links.
- `src/Pages/Home.jsx` — updated detail link paths.

## Key Concepts Introduced
- `react-router-dom` routes and links
- Route-based page navigation
- URL-driven detail page state

## Why These Changes Were Made
Routing is the next logical step after composing pages and components because it enables separate views and navigation.

## How to Run
```bash
npm install
npm start
```

## Reference
See `frontend/main-client/` for the full production version of this feature.
