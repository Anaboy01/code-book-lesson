# LFive-contextAPI

## Topic
React Context for shared app state.

## What Changed From the Previous Lesson
This lesson introduces a cart context so UI state can be shared between the header, home page, and cart page.

### New Files
- `src/context/CartContext.jsx` — cart state and actions.
- `src/Pages/Cart.jsx` — cart view powered by context.

### Modified Files
- `src/main.jsx` — wrapped the app in `CartProvider`.
- `src/Components/Layout/Header.jsx` — added live cart count from context.
- `src/Pages/Home.jsx` and `src/Pages/ProductDetails.jsx` — added cart actions.

## Key Concepts Introduced
- React Context API
- Shared state across sibling components
- Basic cart state management

## Why These Changes Were Made
Context is a low-effort way to share state across an app before moving to a more formal state management layer.

## How to Run
```bash
npm install
npm start
```

## Reference
See `frontend/main-client/` for the full production version of this feature.
