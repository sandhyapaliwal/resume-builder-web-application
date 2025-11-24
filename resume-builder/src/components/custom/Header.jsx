import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
  // useUser hook gives info about the current user and sign-in status from Clerk
  const { user, isSignedIn } = useUser();

  // Return the header JSX UI
  return (
    <div
      className="p-3 px-5 flex justify-between no-print"   // Padding y (3), padding x (5), flex layout, space-between, hide when printing
      style={{
        background: "rgba(0, 33, 71, 0.1)",               // Semi-transparent blue background for glass effect
        backdropFilter: "blur(8px)",                       // Blur behind content for frosted glass effect
        borderBottom: "1px solid #c2d9f4",                 // Light blue border line at bottom
        boxShadow: "0 2px 16px 0 rgba(80,130,205,.03)",    // Soft subtle shadow below header
        position: "sticky",                                 // Sticky position so header stays visible on scroll
        top: 0,                                             // Stick at top of viewport
        zIndex: 30,                                         // High z-index to layer above other content
      }}
    >
      {/* Left side Link to Dashboard - currently empty (no content between Link tags) */}
      <Link to={'/dashboard'}>
       
      </Link>

      {/* Conditional rendering based on whether user is signed in */}
      {isSignedIn ? (
        // If user signed in: show Dashboard button and UserButton
        <div className='flex gap-2 items-center'>           
          <Link to={'/dashboard'}>
            <Button
              className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-bold px-6 py-2  shadow-lg hover:scale-105 transition"
              
            >
              Dashboard
            </Button>
          </Link>

          
          <UserButton />{/*pre-built Clerk component that displays the logged-in user's avatar and provides account management features like sign out. */}
        </div>
      ) : (
        // If user not signed in: show "Get Started" button linking to sign-in page
        <Link to={'/auth/sign-in'}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  )
}

export default Header                                // Export the Header component as default