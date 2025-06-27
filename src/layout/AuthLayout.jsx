import React from 'react'
import { Outlet } from 'react-router'
import Logo from '../pages/shared/Logo/Logo'
import authImage from '../assets/authImage.png'
const AuthLayout = () => {
  return (
    <div className='relative min-h-screen font-font-inter'>
      {/* Fixed Top-Left Logo */}
      <div className='absolute top-6 left-6 z-50'>
        <Logo />
      </div>

      {/* Page Layout: Two Columns or Stacked on Small Devices */}
      <div className='flex flex-col-reverse md:flex-row min-h-screen'>
        {/* Left Side: Form Area */}
        <div className='flex-1 bg-base-100 flex justify-center items-center min-h-[calc(100vh-335px)] md:min-h-[calc(100vh-76px)] px-4  md:pt-0'>
          <Outlet />
        </div>

        {/* Right Side: Image */}
        <div className='md:flex-1 bg-gradient-to-r from-[#FAFDF0] to-[#FDFDFD] flex items-center justify-center p-4 md:p-0'>
          <img
            src={authImage}
            alt='Auth Illustration'
            className='w-full max-w-md md:max-w-full object-contain'
          />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
