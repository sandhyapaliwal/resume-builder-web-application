import React from 'react';
import { useRouteError } from 'react-router-dom'; // Import the hook from react-router-dom to access route-level error info

export default function ErrorBoundary() {
  // Call the useRouteError hook to get any error object encountered by the current route's error boundary
  const error = useRouteError();//This hook retrieves the error caught for this route. It may be an object containing message or statusText.Returns JSX:

  return (
    <div className="error-boundary"> {/* Container div for styling the error message */}
      <h2>Something went wrong.</h2>
       {/* Show a specific error message:
            - Prefer error.message if available
            - Else, show error.statusText (e.g., from HTTP response)
            - Else, show a generic fallback message
        */}
      <p>{error?.message || error?.statusText || "Something went wrong."}</p>
    </div>
  );
}
