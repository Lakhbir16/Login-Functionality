import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import New from './Login'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Dashboard from './dashboard'

function App() {

  return (
  <>
  <BrowserRouter>
   <Routes>
   <Route path="/" element={<p>Home page</p>}/>
   <Route path="Login" element={<New />}/>
   <Route path="Dashboard" element={<Dashboard />}/>
   <Route path="*" element={<h1 className='text-[4rem] justify-center flex mt-[20%]'>Page Not Found !!</h1>} /> 
   </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
