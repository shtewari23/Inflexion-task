# React Application

This project is a modern React web application that leverages **Material UI**, **Styled Components**, and the `sx` prop for styling. It follows a modular, maintainable architecture with built-in optimization techniques and state management using Redux.

---

## 🚀 Getting Started

To run the project locally:

```bash
npm install
npm start
Ensure you have Node.js installed.

#  Project Architecture
State Management: 

Centralized state using Redux

Local state via useState, useReducer, and side-effects handled with useEffect

Used JEST for unit testing

##Styling:

Material UI for responsive, component-based UI

Styled Components for reusable, scoped styling

SX prop for inline styling convenience

##Routing:

Implemented using React Router for SPA navigation

##Component Structure:

Reusable functional components inside component folder

Created Redux slice to hadnle operations

Clean separation between components, pages, and redux


## Optimization Techniques
Lazy Loading: Code splitting to reduce initial bundle size

React.memo: Prevents unnecessary re-renders

Code Splitting: Dynamic imports for better performance

useCallback / useMemo: Memoized functions and values to avoid recalculations

Debouncing: Applied on input events like search

Efficient Redux Selectors (optional if reselect used)

Used jest for testing

##   Challenges Faced
Deployment Issues

Encountered problems deploying the project. Likely related to configuration or platform-specific constraints.

Maintaining persisted state without hydration issues was challenging.

## Deployed Link

https://inflexionnn.netlify.app/