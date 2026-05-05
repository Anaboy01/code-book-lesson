# LOne-structuringTheProjectDirectory

## Topic
File and folder structure for a React application.

## What Changed From Previous Lesson
This is the first lesson—it establishes the base structure for all following lessons.

## Key Concepts Introduced
- React project folder conventions
- Component-based architecture (Layout, Elements, Pages, Data)
- Vite build configuration
- Tailwind CSS global theme
- JSX syntax and component exports

## Why These Changes Were Made
This foundation organizes the project by concern:
- **Layout/**: Shared UI shells (Header, Footer)
- **Elements/**: Reusable pieces (ProductCard, Rating)
- **Pages/**: Full page views (Home, Login, Dashboard)
- **Data/**: Static or mock data
- **Services/**: (Added in later lessons) API calls
- **Context/**: (Added in later lessons) Global state
- **Hooks/**: (Added in later lessons) Shared logic

## What You Should See When You Run This
✓ A clean header with "CodeBook" title
✓ A hero section explaining Lesson 1
✓ Four product cards displayed in a responsive grid
✓ Professional styling with white cards, smooth shadows, proper spacing

No interactivity yet—this is the foundation.

## How to Run
```bash
npm install
npm run dev
```

Visit http://localhost:5173 to see the home page.

## Next Lesson
In Lesson 2, we'll add more components and pages (without routing yet) to build up the full UI library.
