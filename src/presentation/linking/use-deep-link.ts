import { useEffect, useState } from 'react'
import { Linking } from 'react-native'

export const useDeepLink = () => {
  const [initialURL, setInitialURL] = useState('')

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      setInitialURL(url || '')
      console.log({
        url,
      })
    })
  }, [])
}
