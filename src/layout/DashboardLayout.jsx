import React from 'react'
import { Link, Outlet } from 'react-router'
import {
  FaTachometerAlt,
  FaBox,
  FaMoneyBillAlt,
  FaMapMarkedAlt,
  FaHome
} from 'react-icons/fa'

import { IoClose } from 'react-icons/io5'
import Logo from '../pages/shared/Logo/Logo'

const DashboardLayout = () => {
  return (
    <div className='drawer lg:drawer-open min-h-screen bg-gray-100'>
      {/* Drawer Toggle Input */}
      <input id='dashboard-drawer' type='checkbox' className='drawer-toggle' />

      {/* Main Content */}
      <div className='drawer-content flex flex-col'>
        {/* Top Navbar (mobile only) */}
        <div className='w-full navbar bg-white shadow px-4 lg:hidden'>
          <label htmlFor='dashboard-drawer' className='btn btn-ghost text-xl'>
            ☰
          </label>
          <span className='ml-2 font-bold text-xl'>
            <Logo></Logo>
          </span>
        </div>

        <div className='p-4'>
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className='drawer-side'>
        {/* Clicking overlay will also close sidebar */}
        <label htmlFor='dashboard-drawer' className='drawer-overlay'></label>

        <aside className='w-64 bg-white shadow h-full relative'>
          {/* Close button (mobile only) */}
          <div className='lg:hidden absolute top-2 right-2'>
            <label
              htmlFor='dashboard-drawer'
              className='btn btn-sm btn-circle btn-ghost'
            >
              <IoClose size={23} />
            </label>
          </div>

          <div className='p-4 font-bold text-2xl border-b'>
            <Logo></Logo>
          </div>
          <ul className='menu p-4 text-base-content'>
            <li>
              <Link to='/dashboard' className='flex items-center gap-2'>
                <FaTachometerAlt /> Dashboard Home
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard/myParcels'
                className='flex items-center gap-2'
              >
                <FaBox /> My Parcels
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard/paymentHistory'
                className='flex items-center gap-2'
              >
                <FaMoneyBillAlt /> Payment History
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard/trackingPackage'
                className='flex items-center gap-2'
              >
                <FaMapMarkedAlt /> Tracking Package
              </Link>
            </li>
            <li>
              <Link to='/' className='flex items-center gap-2'>
                <FaHome /> Back to Home
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default DashboardLayout
