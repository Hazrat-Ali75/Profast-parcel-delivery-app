import React from 'react'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router'
const Logo = () => {
  return (
    <Link to='/'>
      <div className='flex items-end'>
        <img className='h-10' src={logo} alt='' />
        <p className='-ml-3 font-semibold text-xl '>Profast</p>
      </div>
    </Link>
  )
}

export default Logo
