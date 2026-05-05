# LTwo-buildingTheComponents

## Topic
Building reusable React components and adding more pages.

## What Changed From Previous Lesson
✅ Added **react-icons** for star ratings  
✅ Created **Rating** component with star display  
✅ Enhanced **ProductCard** to show ratings and reviews  
✅ Added **Footer** component  
✅ Created **Login** page with email/password form  
✅ Created **Register** page with account creation form  
✅ Created **Cart** page (static, empty state)  
✅ Updated **App.jsx** to include Footer  
✅ Expanded product data with ratings and review counts  

## Key Concepts Introduced
- Component composition (smaller pieces → larger UI)
- Passing props to components
- Reusable form patterns
- Empty state messaging
- Icon libraries (react-icons)

## Why These Changes Were Made
Instead of building one giant page, we break the UI into small, testable, reusable components:
- **Rating**: Can be used on products, reviews, user profiles
- **ProductCard**: Combines Header, Description, Price, Rating in one
- **Login/Register/Cart**: Full pages now exist as components
- **Footer**: Shared layout piece across all pages

This pattern scales: future lessons will add routing to switch between these pages, then state to make them interactive.

## What You Should See When You Run This
✓ Header with CodeBook title  
✓ Hero explaining Lesson 2  
✓ **6 product cards** (doubled from Lesson 1) with:
  - Title and description
  - Price
  - **5-star rating display** (new)
  - Review count
  - Hover effect on cards
✓ Footer at the bottom  

All static pages exist in the code—the Home page displays all 6 products as a gallery.

## How to Run
```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Next Lesson
In Lesson 3, we'll add **React Router** to switch between these pages dynamically without page reloads.
