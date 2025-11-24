import { useUser } from '@clerk/clerk-react'; 
import { Navigate, Outlet } from 'react-router-dom'; // Import navigation components: Navigate for redirect, Outlet for nested routes
import Header from './components/custom/Header'; 
import { Toaster } from './components/ui/sonner'; // Import Toaster component for toast notifications
import './App.css'; 


function App() {
  // Extract user authentication status and info from Clerk hook
  const { user, isLoaded, isSignedIn } = useUser();//Using useUser() hook from Clerk.  user, isLoaded, isSignedIn are clerks useUser() functions.

  // While authentication state is loading, show a temporary loading UI
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Navigate is a React Router component that If user is NOT signed in, redirect to the sign-in page
  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // user succesfully signed in so execute return
  return (
    <>
      {/* Sticky header at the top with light blue background and bottom border. so the header div does not move even when scroll. */}
      <div className="bg-blue-50 border-b border-blue-100 sticky top-0 z-30 shadow-sm">
        <Header /> {/* Render the header/navigation component */}
      </div>

      {/* Main content area with minimum height to fill screen and matching background */}
      <main className="min-h-screen bg-blue-50">
        <Outlet /> {/*<Outlet /> is used as placeholder here so whichever path will be matched that content will be shown at this particular small layout in ui. */}
      </main>

      {/* Toast notifications container (for alerts/feedback) */}
      <Toaster />
    </>
  );
}

export default App; // Export the App component as default export
