import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'

import { CreateGroupFAB, GroupList } from './components'

type Props = {}

const HomeScreen: Screen<Props, Screens.HOME> = ({ user }) => {
  return (
    <View style={styles.container}>
      <GroupList displayName={user?.displayName || ''} />
      <CreateGroupFAB />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default HomeScreen
