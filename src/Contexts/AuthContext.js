import { onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signOut,
sendPasswordResetEmail, 
updateEmail, updatePassword} from 'firebase/auth'
import React, { useContext, useEffect, 
  useState, createContext } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currUser, setCurrUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth, email)
  }

  function newEmail(email){
    return updateEmail(currUser, email)
  }
  
  function newPassword(password){
    return updatePassword(currUser, password)
  }


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrUser(user)
      setLoading(false)
    })
    return unsub
  }, [])

  const value = {
    currUser,
    signup,
    login,
    logout,
    resetPassword,
    newEmail,
    newPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}