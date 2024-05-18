//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback={"loading..."}><LandingPage /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={'loading'}><Signup/></Suspense>} />
        <Route path="/signin" element={<Suspense fallback={'loading'}><Signin /></Suspense>} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App

/*
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>
          Sign In
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <a href='https://github.com/raisatya/deducee-microservices' className="read-the-docs">
        https://github.com/raisatya/deducee-microservices
      </a>
*/
