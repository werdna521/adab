import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Screen, Screens } from '~/presentation/navigation'

import { Button } from '../common/components'

type Props = {}

const JoinScreen: Screen<Props, Screens.JOIN> = ({ navigation }) => {
  const handleIgnore = () => navigation.pop()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You're invited to join the group "Hello, world!"
      </Text>
      <View style={styles.buttonContainer}>
        <Button minWidth={150} primary={false} onPress={handleIgnore}>
          Ignore
        </Button>
        <Button style={styles.joinButton} minWidth={150} primary>
          Join
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    color: '#1d2d48',
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 250,
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },
  joinButton: {
    marginLeft: 16,
  },
})

export default JoinScreen
