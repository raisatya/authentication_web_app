import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import LandingPage from './pages/LandingPage'
import Signout from './pages/Signout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback={"loading..."}><LandingPage /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={'loading'}><Signup/></Suspense>} />
        <Route path="/signin" element={<Suspense fallback={'loading'}><Signin /></Suspense>} />
        <Route path="/signout" element={<Suspense fallback={'loading'}><Signout/></Suspense>} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App