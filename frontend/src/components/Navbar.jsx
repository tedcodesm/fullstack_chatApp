import React from 'react'
import { useAuthStore } from '../store/useAuthstore.js'
import { Link } from 'react-router-dom';
import { LogOut, MessagesSquare, User } from 'lucide-react';

const Navbar = () => {

    const {logout,authuser} = useAuthStore();
  return (
   <header className='bg-base-100  border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
  <div className="container mx-auto px-4 flex-row flex justify-between  h-16">
    <div className="flex items-center justify-between h-full">
        <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
        <MessagesSquare className='size-5 test-primary'/>
        </div>
        <h1 className="text-lg font-bold">T^_~ED</h1>
        </Link>
    </div>
    <div className="flex items-center gap-2">
        <Link to="/setting" className="btn btn-sm gap-2 transition-colord">Settings</Link>
        {
            authuser && (
                <>
                <Link to="/profile" className="btn btn-sm gap-2">
                <User className='size-5 '/>
                <span className="hidden sm:inline">Profile</span>
                </Link>


                <button onClick={logout} className="btn btn-sm gap-2">
                <LogOut className='size-5 '/>
                <span className="hidden sm:inline">logout</span>
                </button>
                </>
            )
        }
    </div>
  </div>
   </header>
  )
}

export default Navbar
