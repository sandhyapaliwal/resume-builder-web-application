import React from 'react'; // Import the core React library to use JSX, components, and hooks.
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering React apps with the new createRoot API.
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Import routing utilities for single-page navigation.
import { ClerkProvider } from '@clerk/clerk-react'; // Import Clerk for authentication context/provider.

import App from './App.jsx'; // Main app wrapper component, includes Header and sets up child routes.
import Home from './home/index.jsx'; // Home page component, rendered at the root path ("/").
import Dashboard from './dashboard/index.jsx'; // Dashboard component for user’s main management area.
import SignInPage from './auth/sign-in/index.jsx'; // Sign-in page component (authentication UI for users).
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'; // EditResume page, for editing a specific resume.
import ViewResume from './my-resume/[resumeId]/view/index.jsx'; // ViewResume page, for read-only viewing of a specific resume.

import ErrorBoundary from './components/ErrorBoundary.jsx'; // Error boundary to catch/render fallback UI for errors.
import { ResumeInfoProvider } from './context/ResumeInfoContext'; // Context provider to manage and supply resume info globally.

import './index.css'; // Global/base CSS styles for the app.
import './App.css'; // App-specific CSS styles (may include layout, theming specifics).

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; // Get Clerk publishable key from environment variables for authentication.

if (!PUBLISHABLE_KEY) { // If Clerk key is missing, throw an error so the app doesn't run without authentication config.
  throw new Error('Missing Clerk publishableKey in environment variables');
}

const router = createBrowserRouter([//router object.
  {
    path: '/', // Root path for the app.
    element: (//element tells which component should load when route path match with url.
      // App component, common wrapper (could include nav/header/footer/shared layout).
      <App />
    ),
    errorElement: <ErrorBoundary />, // Catches errors in routes
    children: [//children allow nesting routes,means subpath
      { index: true, element: <Home /> }, // Default home page rendered at "/".
      {
        path: 'dashboard', // Matches "/dashboard".
        element: (
          //wrraping resumeinfoprovider outside because it provides data tp children/component inside wrapping. so they can share and update resume information without passing props through many layers.
          <ResumeInfoProvider>
            <Dashboard />
          </ResumeInfoProvider>
        ), // Provides resume context to Dashboard and descendants.
        errorElement: <ErrorBoundary />, // Catches errors in Dashboard route.
      },
      {
        path: 'dashboard/resume/:resumeId/edit', // Matches "/dashboard/resume/123/edit".
        element: (
          <ResumeInfoProvider>
            <EditResume />
          </ResumeInfoProvider>
        ), // Provides resume context for editing.
        errorElement: <ErrorBoundary />, // Catches errors in EditResume page.
      },
      {
        path: 'my-resume/:resumeId/view', // Matches "/my-resume/456/view".
        element: (
          <ResumeInfoProvider>
            <ViewResume />
          </ResumeInfoProvider>
        ), // Provides resume context for viewing.
        errorElement: <ErrorBoundary />, // Catches errors in ViewResume page.
      },
    ],
  },
  {// sig-in is diff it doesnt require wrapping .
    path: '/auth/sign-in', // Matches "/auth/sign-in".
    element: <SignInPage />, // Renders sign-in form/page.
    errorElement: <ErrorBoundary />, // Catches errors in SignInPage.
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(//Finds the HTML element with id="root" in your index.html file and sets up React’s rendering system there (this is where your app appears in the browser).
  
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}> {/* The <ClerkProvider> ensures authentication works everywhere in your app. */}
    <RouterProvider router={router} /> {/* Provides and enables the app's routing system and The <RouterProvider> enables client-side navigation—loading different components as users visit different URLs, all without reloading the page.*/}
  </ClerkProvider>
  
);
