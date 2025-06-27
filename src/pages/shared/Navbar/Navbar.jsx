import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import Logo from '../Logo/Logo'
import { AuthContext } from '../../../context/AuthContext'

const Navbar = () => {
  const { user, setUser, handleLogOut } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSignOut = () => {
    handleLogOut()
      .then(() => {
        setUser(null)
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='navbar bg-base-100 shadow-sm rounded-[14px] py-3'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {' '}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-color-textgray'
          >
            <li>
              <NavLink>Services</NavLink>
            </li>
            <li>
              <NavLink to='/coverage'>Coverage</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to='/addPercel'>Add Percel</NavLink>
            </li>
            <li>
              <NavLink>Be a Rider</NavLink>
            </li>
            <li className='block md:hidden'>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className='btn btn-outline mr-4 rounded-[8px]'
                >
                  Logout
                </button>
              ) : (
                <Link to='/login'>
                  {' '}
                  <button className='btn btn-outline rounded-[8px] mr-3 border-1 border-gray-300 text-color-textgray'>
                    Sign In
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 text-color-textgray '>
          <li>
            <NavLink>Services</NavLink>
          </li>
          <li>
            <NavLink to='/coverage'>Coverage</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to='/addPercel'>Add Percel</NavLink>
          </li>
          <li>
            <NavLink>Be a Rider</NavLink>
          </li>
          <li className=' md:hidden '>
            {user ? (
              <button
                onClick={handleSignOut}
                className='btn btn-outline mr-4  rounded-[8px] '
              >
                Logout
              </button>
            ) : (
              <Link to='/login'>
                {' '}
                <button className='btn btn-outline rounded-[8px] mr-3   border-1 border-gray-300 text-color-textgray'>
                  Sign In
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className='navbar-end '>
        {user ? (
          <button
            onClick={handleSignOut}
            className='btn btn-outline mr-4 rounded-[8px] hidden md:block'
          >
            Logout
          </button>
        ) : (
          <Link to='/login'>
            {' '}
            <button className='btn btn-outline rounded-[8px] mr-3 border-1 border-gray-300 text-color-textgray hidden md:block'>
              Sign In
            </button>
          </Link>
        )}
        <button className='btn bg-color-green rounded-[8px] text-color-darkgreen hidden md:block'>
          Be a Rider
        </button>
      </div>
    </div>
  )
}

export default Navbar
