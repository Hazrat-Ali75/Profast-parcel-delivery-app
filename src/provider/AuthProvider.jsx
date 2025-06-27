import React, { useEffect, useState } from 'react'

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { auth } from '../firebase/firebase.init'
import { AuthContext } from '../context/AuthContext'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const googleProvider = new GoogleAuthProvider()

  const handleRegister = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const handleRegisterGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
  const handleLogin = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  const handleLogOut = () => {
    return signOut(auth)
  }
  const handleUpdate = updateData => {
    setLoading(true)
    return updateProfile(auth.currentUser, updateData)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    handleRegister,
    handleRegisterGoogle,
    handleLogin,
    handleLogOut,
    handleUpdate
  }
  return <AuthContext value={authInfo}>{children}</AuthContext>
}

export default AuthProvider
