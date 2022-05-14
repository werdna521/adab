import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Screen, Screens } from '../navigation'

type Props = {}

const CreateGroupScreen: Screen<Props, Screens.CREATE_GROUP> = () => {
  return (
    <View style={styles.container}>
      <Text>Create Group</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})

export default CreateGroupScreen
