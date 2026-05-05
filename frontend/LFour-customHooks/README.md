# LFour-customHooks

## Topic
Custom React hooks for data loading and page metadata.

## What Changed From the Previous Lesson
This lesson extracts data loading logic into reusable hooks and adds an app-level title hook.

### New Files
- `src/hooks/useProducts.js` — fetches the product list.
- `src/hooks/useProduct.js` — fetches a single product by id.
- `src/hooks/useTitle.js` — updates the document title.

### Modified Files
- `src/Pages/Home.jsx` — uses `useProducts` instead of manual effect logic.
- `src/Pages/ProductDetails.jsx` — uses `useProduct` and `useTitle`.

## Key Concepts Introduced
- Custom hook abstractions
- Hook composition for page behavior
- Separation of side effects from UI

## Why These Changes Were Made
Custom hooks make behavior reusable and keep page components focused on rendering.

## How to Run
```bash
npm install
npm start
```

## Reference
See `frontend/main-client/` for the full production version of this feature.
