import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from '../firebase/init'

export enum AuthState {
  LOGGED_IN = 'loggedIn',
  LOGGED_OUT = 'loggedOut',
  UNKNOWN = 'unknown',
}

export type User = {
  displayName?: string
  email?: string
  uid?: string
}

type AuthContextValues = {
  isLoggedIn: boolean
  isLoggedOut: boolean
  isAuthUnknown: boolean
  user: User
}

const AuthContext = createContext<AuthContextValues>({
  isLoggedIn: false,
  isLoggedOut: false,
  isAuthUnknown: true,
  user: {
    displayName: '',
    email: '',
    uid: '',
  },
})

// mirip buat global variable untuk children childrennya
export const AuthProvider: FC = ({ children }) => {
  const [status, setStatus] = useState(AuthState.UNKNOWN)
  const [user, setUser] = useState<User>({})

  const isLoggedIn = status === AuthState.LOGGED_IN
  const isLoggedOut = status === AuthState.LOGGED_OUT
  const isAuthUnknown = status === AuthState.UNKNOWN

  // function untuk tracking usernya sudah login atau belum
  useEffect(() => {
    auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName || undefined,
          email: firebaseUser.email || undefined,
          uid: firebaseUser.uid,
        })
        setStatus(AuthState.LOGGED_IN)
      } else setStatus(AuthState.LOGGED_OUT)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoggedOut,
        isAuthUnknown,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
