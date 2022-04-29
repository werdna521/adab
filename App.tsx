import React, { FC } from 'react'
import { StatusBar } from 'react-native'

import AppNavigation from './src/presentation/navigation'

const App: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <AppNavigation />
    </>
  )
}

export default App
