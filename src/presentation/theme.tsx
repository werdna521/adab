import React, { FC, createContext, useState, useContext } from 'react'

type ThemeContextValues = {
  isLowVisionMode: boolean
  toggleLowVisionMode: () => void
}
const ThemeContext = createContext<ThemeContextValues>({
  isLowVisionMode: false,
  toggleLowVisionMode: () => {},
})

export const ThemeProvider: FC = ({ children }) => {
  const [isLowVisionMode, setIsLowVisionMode] = useState(true)

  const toggleLowVisionMode = () =>
    setIsLowVisionMode((prevState) => !prevState)

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
