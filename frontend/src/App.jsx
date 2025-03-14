import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/useAuthstore.js'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar.jsx'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const {authuser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
   const {theme} = useThemeStore()
 
   console.log({onlineUsers})

 useEffect(()=>{
 checkAuth()
 },[checkAuth]);

 useEffect(() => {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
}, [theme]);



 console.log({authuser});
 
 if (isCheckingAuth && !authuser)
  return(
<div className="flex items-center justify-center min-h-screen">
  <div className="relative">
    <div className="relative w-32 h-32">
      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
      ></div>

      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
      ></div>
    </div>

    <div
      className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"
    ></div>
  </div>
</div>



)

  return (
    
    <div data-theme={theme} >
      <Navbar/>
    <Routes>
    <Route index path="/" element={authuser ? <HomePage/> : <Navigate to="/login"/>}/>  
    <Route path="/signup" element={ !authuser ? <SignupPage/> : <Navigate to="/"/>}/>  
    <Route path="/login" element={!authuser ? <LoginPage/> :<Navigate to="/"/>}/>  
    <Route path="/profile" element={authuser ? <ProfilePage/> : <Navigate to="/login"/>}/>  
    <Route path="/setting" element={<SettingsPage/>}/>  
    </Routes>   
    <ToastContainer/>   
    </div>
  )
}

export default App
