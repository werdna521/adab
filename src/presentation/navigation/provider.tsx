import { NavigationContainer, Theme } from '@react-navigation/native'
import React, { FC } from 'react'

type Props = {
  theme?: Theme
}

const NavigationProvider: FC<Props> = ({ theme, children }) => {
  return <NavigationContainer theme={theme}>{children}</NavigationContainer>
}

export default NavigationProvider
