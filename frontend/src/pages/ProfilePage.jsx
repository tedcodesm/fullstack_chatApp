import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthstore.js'
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const {authuser,updateProfile,isUpdatingProfile} = useAuthStore();
  const [selectedimg,setSelectedImg] = useState(null)

  const handleImageUpload = async(e) =>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async()=>{
      const base64image = reader.result;
      setSelectedImg(base64image)
      await updateProfile({profilepic:base64image}); 
    }
  }
  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar icon */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={selectedimg || authuser.profilepic || "/user.png"}alt="" className="size-32 rounded-full object-cover border-4" />
              <label htmlFor="fileInput" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
           <Camera className='size-5 text-base-200'/>
           <input id="fileInput" type="file" accept='image/*' onChange={handleImageUpload} disabled={isUpdatingProfile} className="hidden" />

                </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className='size-4'/>
                Full Name
              </div>
              <p className="px-4 py-2 5 bg-base-200 rounded-lg border">{authuser?.fullname}</p>
            </div>
            <div className="space-y-1 5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className='size-4'/>
                Email Address
              </div>
              <p className="px-4 py-2 5 bg-base-200 rounded-lg border">{authuser?.email}</p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Memmber since</span>
                <span>{authuser.createdAt?.split("T") [0] }</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProfilePage
