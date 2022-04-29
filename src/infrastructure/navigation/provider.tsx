import React, { FC } from 'react'
import { NavigationContainer, Theme } from '@react-navigation/native'

type Props = {
  theme?: Theme
}

const NavigationProvider: FC<Props> = ({ theme, children }) => {
  return <NavigationContainer theme={theme}>{children}</NavigationContainer>
}

export default NavigationProvider
