import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'

type ThemeContextValues = {
  isLowVisionMode: boolean
  toggleLowVisionMode: () => boolean
}
const ThemeContext = createContext<ThemeContextValues>({
  isLowVisionMode: false,
  toggleLowVisionMode: () => false,
})

export const ThemeProvider: FC = ({ children }) => {
  const [isLowVisionMode, setIsLowVisionMode] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('isLowVisionMode').then((value) =>
      setIsLowVisionMode(value === 'true'),
    )
  }, [])

  const toggleLowVisionMode = () => {
    const newMode = !isLowVisionMode
    setIsLowVisionMode(newMode)
    return newMode
  }

  return (
    <ThemeContext.Provider
      value={{
        isLowVisionMode,
        toggleLowVisionMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
