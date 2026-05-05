# LFour-customHooks

## Topic
Creating custom hooks to extract and reuse logic across components.

## What Changed From Previous Lesson
✅ Created **useTitle** custom hook in `src/Hooks/useTitle.js`  
✅ Updated **Home, Login, Register, Cart** pages to call `useTitle()`  
✅ Check browser tab title—it now changes when navigating pages!  

## Key Concepts Introduced
- Custom hooks: functions that call other hooks and return state/functions
- `useEffect` dependency arrays
- Hook naming convention (prefix with "use")
- Extracting repeated logic into reusable hooks

## Why These Changes Were Made
Each page had similar code to set the document title. By creating `useTitle`, we:
- Avoid code duplication
- Make title changes consistent and maintainable
- Demonstrate hook composition (useEffect inside a custom hook)
- Prepare for more complex hooks in future lessons

## What You Should See When You Run This
✓ Visit the home page → browser tab says "Home - Browse Courses - CodeBook"  
✓ Click "Login" → tab says "Sign In - CodeBook"  
✓ Click "Create Account" → tab says "Create Account - CodeBook"  
✓ Click "Cart" → tab says "Shopping Cart - CodeBook"  
✓ Click "Home" → tab updates back  

The hook is small but demonstrates the power of extracting logic.

## How to Run
```bash
npm install
npm run dev
```

Watch the browser tab title change as you navigate.

## Next Lesson
In Lesson 5, we'll add **React Context** to manage global state (like a shopping cart that persists across pages).
