# LTwo-buildingTheComponents

## Topic
Building reusable React components and separating presentation from data.

## What Changed From the Previous Lesson
This lesson adds a component hierarchy, a hero section, and a shared footer while preserving the base project structure.

### New Files
- `src/utils/rpc.js` — JSON-RPC-style helper stub for loading products.
- `src/Components/Sections/Hero.jsx` — landing section for the home page.
- `src/Components/Layout/Footer.jsx` — footer layout component.

### Modified Files
- `src/App.jsx` — updated to include the footer.
- `src/Pages/Home.jsx` — now loads product list from `src/utils/rpc.js`.

## Key Concepts Introduced
- Component decomposition
- Presentation and layout components
- Data loading abstraction

## Why These Changes Were Made
Learners need to see how a flat app grows into reusable component pieces before routing is added.

## How to Run
```bash
npm install
npm start
```

## Reference
See `frontend/main-client/` for the full production version of this feature.
