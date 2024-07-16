import React from 'react'
import {BrowserRouter , Routes , Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
    
    </BrowserRouter>
    
  )
}
