import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignOutButton
} from '@clerk/clerk-react'

const App = () => {
  return (
    <>
      <SignedIn>
        <h1>✅ You are signed in</h1>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <h1>❌ You are signed out</h1>
        <SignIn />
      </SignedOut>
    </>
  )
}

export default App
