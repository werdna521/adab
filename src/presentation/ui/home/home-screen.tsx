import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'

import { CreateGroupFAB, GroupList } from './components'

type Props = {}

const HomeScreen: Screen<Props, Screens.HOME> = ({ user, navigation }) => {
  const navigateToCreateGroup = () => navigation.navigate(Screens.CREATE_GROUP)

  return (
    <View style={styles.container}>
      <GroupList displayName={user?.displayName || 'User'} />
      <CreateGroupFAB navigateToCreateGroup={navigateToCreateGroup} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default HomeScreen
