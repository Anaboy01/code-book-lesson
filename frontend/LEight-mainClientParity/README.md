# LEight-mainClientParity

## Topic
Bring the lesson project to full `main-client` feature parity while keeping `json-server` as the backend.

## Features Introduced in This Lesson
- Added the remaining `main-client` pages and route flows: demo, dashboard, order summary, and related components.
- Added the missing cart/order/dashboard/home subcomponents from `main-client`.
- Restored reducer exports and supporting files so context and filters match `main-client` behavior.
- Updated API config and service layer to work with `http://localhost:3001` (`products`, `users`, `orders`, `carts`) while preserving existing app contracts.

## Features Carried Forward From Previous Lesson
- Routing, auth screens, product list/details, cart, admin panel.
- Context + reducer state patterns.
- Existing styling and component structure from earlier lessons.

## Features Still To Come
- Full static asset parity from `main-client/public` and any local asset directories.
- Optional split of this parity work into additional smaller pedagogical lessons.

## What Changed From the Previous Lesson

### New Files
- Multiple files copied from `main-client/src` that were missing in Lesson 7 (dashboard, order, home/cart component groups, utility components, reducers, and route-linked pages).

### Modified Files
- `src/config/api.js` — switched endpoint config to json-server (`localhost:3001`).
- `src/Services/authService.jsx` — json-server login/register/logout flow.
- `src/Services/dataService.js` — current-user/status logic backed by local storage + json-server users lookup.
- `src/Services/productServices.js` — featured-product compatibility for `bestSeller`/`best_seller`.
- `src/Services/cartService.js` — json-server cart persistence (`/carts`) per logged-in email.
- `src/Services/orderServices.js` — json-server order creation/fetch (`/orders`) and cart clear on checkout.
- `package.json` — lesson package name updated to `code-book-lesson-8`.

### Removed Files (if any)
- None.

## Key Concepts Introduced
- Parity migration from a reference app.
- Contract-preserving service rewrites.
- json-server resource modeling for auth/cart/order flows.

## Why These Changes Were Made
Lesson 7 still lacked several `main-client` flows and files, so this lesson closes the largest parity gap in one cumulative step. The service layer was updated carefully so UI contracts stay the same while the backing API switches to `json-server`, which keeps the lesson consistent with the series requirement.

## What You Should See When You Run This
You should now be able to navigate through the same core route set and page-level experiences as `main-client`, including dashboard and order summary flows, with data reads/writes going to `json-server` resources.

## How to Run
```bash
npm install
npx json-server --watch Data/db.json --port 3001
npm run dev
```

## Reference
See `frontend/main-client/` for the full production version.
