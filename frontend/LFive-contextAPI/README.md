# LFive-contextAPI

## Topic
Managing global state with React Context API and useReducer.

## What Changed From Previous Lesson
✅ Created **CartContext** with CartProvider  
✅ Created **FilterContext** with FilterProvider  
✅ Created **cartReducer** to manage cart actions  
✅ Wrapped app in providers in main.jsx  
✅ Updated **Header** to show cart item count  
✅ Updated **ProductCard** with "Add to Cart" button  
✅ Updated **Cart page** to display cart contents and total  
✅ Added **react-toastify** for notifications (used in later lessons)  
✅ Created **cartService** (mock for now)  

## Key Concepts Introduced
- React Context: Create and provide global state
- useReducer: Complex state logic management
- Provider pattern: Wrap components to make context available
- useContext: Consume context in components
- Dispatch pattern: Trigger state changes with actions

## Why These Changes Were Made
Global state (like a shopping cart) needs to be accessible from many components:
- Header (to show cart count)
- ProductCard (to add items)
- Cart page (to display contents)

Without Context, we'd have to "prop drill"—pass cart state down through many intermediate components. Context centralizes state and makes it available to any component that needs it.

## What You Should See When You Run This
✓ Header shows a shopping cart icon with a **red badge** showing cart count  
✓ Click the cart icon in product cards → "Add to Cart"  
✓ Watch the cart count in header **update in real-time**  
✓ Navigate to /cart → see all items you added with total price  
✓ Cart persists while you navigate (because it's in context)  

The app now has **functional global state**!

## How to Run
```bash
npm install
npm run dev
```

Add items to the cart and navigate around to see state persist.

## Next Lesson
In Lesson 6, we'll show an alternative to Context: **Redux state management**.
