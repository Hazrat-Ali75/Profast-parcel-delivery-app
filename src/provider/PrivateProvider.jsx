import React, { useContext } from 'react'

import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const PrivateProvider = ({ children }) => {
 const {loading , user} = useContext(AuthContext)

  const location = useLocation()

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (user && user.email) {
    return children
  }

  return <Navigate state={location.pathname} to='/login'></Navigate>
}

export default PrivateProvider
