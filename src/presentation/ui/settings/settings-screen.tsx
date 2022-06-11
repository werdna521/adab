import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LogOutUseCase from '~/interactor/auth/logout-use-case'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button } from '../common/components'
import { useSettingsViewModel } from './settings-view-model'

type Props = {
  logOutUseCase: LogOutUseCase
}

const SettingsScreen: Screen<Props, Screens.SETTINGS> = ({ logOutUseCase }) => {
  const { isProcessing, handleLogOut } = useSettingsViewModel({
    logOutUseCase,
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button
        style={styles.logoutButton}
        onPress={handleLogOut}
        disabled={isProcessing}
      >
        Logout
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize() + 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#1d2d48',
    fontWeight: '600',
  },
  logoutButton: {
    marginBottom: 24,
  },
})

export default SettingsScreen
