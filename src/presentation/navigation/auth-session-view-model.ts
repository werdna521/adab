import { useEffect, useState } from 'react'

import { User } from '~/domain/model'
import SubscribeAuthStateUseCase from '~/interactor/auth/subscribe-auth-state-use-case'

type Params = {
  subscribeAuthStateUseCase: SubscribeAuthStateUseCase
}

enum AuthStatus {
  LOADING = 'loading',
  LOGGED_IN = 'loggedIn',
  LOGGED_OUT = 'loggedOut',
}

export const useAuthSessionViewModel = (params: Params) => {
  const { subscribeAuthStateUseCase } = params

  const [authStatus, setAuthStatus] = useState(AuthStatus.LOADING)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = subscribeAuthStateUseCase.invoke((state) => {
      if (state.isLoggedIn) {
        setAuthStatus(AuthStatus.LOGGED_IN)
        setUser(state.user)
        return
      }

      setAuthStatus(AuthStatus.LOGGED_OUT)
      setUser(undefined)
    })

    return () => unsubscribe()
  }, [subscribeAuthStateUseCase])

  const isAuthLoading = authStatus === AuthStatus.LOADING
  const isLoggedIn = authStatus === AuthStatus.LOGGED_IN
  const isLoggedOut = authStatus === AuthStatus.LOGGED_OUT

  return {
    isAuthLoading,
    isLoggedIn,
    isLoggedOut,
    user,
  }
}
