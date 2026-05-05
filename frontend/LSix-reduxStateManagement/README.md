# LSix-reduxStateManagement

## Topic
Redux Toolkit for app state management.

## What Changed From the Previous Lesson
This lesson replaces Context with Redux Toolkit to manage the cart state in a more scalable way.

### New Files
- `src/store/cartSlice.js` — cart slice with actions and reducers.
- `src/store/store.js` — Redux store configuration.

### Modified Files
- `src/main.jsx` — wrapped the app in Redux Provider.
- `src/Components/Layout/Header.jsx` — reads cart count from Redux state.
- `src/Pages/Home.jsx`, `src/Pages/ProductDetails.jsx`, `src/Pages/Cart.jsx` — dispatch cart actions and read store state.

## Key Concepts Introduced
- Redux Toolkit slice patterns
- Redux Provider and hooks
- Global state management for cart data

## Why These Changes Were Made
Redux demonstrates a more deliberate state-management pattern for apps that grow beyond Context.

## How to Run
```bash
npm install
npm start
```

## Reference
See `frontend/main-client/` for the full production version of this feature.
