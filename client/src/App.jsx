import React from 'react'
import {BrowserRouter , Routes , Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreatePage from './pages/CreatePage';
import OnlyPrivateRoute from './components/OnlyPrivateRoute';
import UpdatePost from './pages/UpdatePost';
import PostPage from './components/PostPage';
import ScrollToTop from './components/ScrollToTop';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route element={<OnlyPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePage/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
        </Route>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/post/:postSlug' element={<PostPage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
      </Routes>
      <Footer/>
    
    </BrowserRouter>
    
  )
}
