# LSix-reduxStateManagement

## Topic
Alternative state management with Redux instead of React Context.

## What Changed From Previous Lesson
✅ Replaced **React Context** with **Redux**  
✅ Created Redux **store** with combined reducers  
✅ Created Redux **actions** for cart operations  
✅ Updated **main.jsx** to use Provider from react-redux  
✅ Updated **Header, ProductCard, Cart** to use `useSelector` and `useDispatch`  
✅ Removed **CartProvider/FilterProvider** components  

## Key Concepts Introduced
- Redux: Centralized state management library
- Single store: All state in one place
- Actions: Objects describing what happened
- Reducers: Pure functions to calculate new state
- Dispatch: Trigger actions
- useSelector: Get state from store
- useDispatch: Access dispatch function

## Why These Changes Were Made
Redux offers benefits for large apps:
- **Predictable state**: Single source of truth
- **Time-travel debugging**: See all past states
- **Testability**: Pure reducers are easy to test
- **DevTools**: Browser extension for state inspection

However, Redux adds complexity. Lesson 5 showed Context (simpler), Lesson 6 shows Redux (more powerful), and Lesson 7 returns to Context (matching main-client).

## What You Should See When You Run This
✓ App looks identical to Lesson 5  
✓ Add to cart functionality works the same  
✓ Cart count updates in header  
✓ Cart page displays items  

Functionally identical to Lesson 5, but using Redux internally instead of Context.

## How to Run
```bash
npm install
npm run dev
```

Open browser DevTools (F12), install Redux DevTools extension, and watch state changes!

## Next Lesson
In Lesson 7, we'll return to Context API (like main-client) and add a real **JSON-RPC Server** for backend integration.
