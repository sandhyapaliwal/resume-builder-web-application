//When a user navigates to the sign-in page URL, this component renders and shows the Clerk sign-in/sign-up form.
import { SignIn } from '@clerk/clerk-react' //imports the SignIn UI component from Clerk's React SDK.
import React from 'react'

function SignInPage() {
  return (
    <div className='flex justify-center my-20 items-center'>
       {/* Render the Clerk SignIn component here, which displays the sign-in (and sign-up) form */}
      <SignIn/>
    </div>
  )
}

export default SignInPage