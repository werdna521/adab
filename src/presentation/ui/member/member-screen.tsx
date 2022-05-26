import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'

import { MemberList } from './components'

type Props = {}

const MemberScreen: Screen<Props, Screens.MEMBER> = ({ route }) => {
  const { members } = route.params

  return (
    <View style={styles.container}>
      <MemberList members={members} onRefresh={() => {}} isRefreshing={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default MemberScreen
