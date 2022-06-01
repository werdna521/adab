import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import JoinGroupUseCase from '~/interactor/group/join-group-use-case'
import { Screen, Screens } from '~/presentation/navigation'

import { Button } from '../common/components'
import { useJoinViewModel } from './join-view-model'

type Props = {
  joinGroupUseCase: JoinGroupUseCase
}

const JoinScreen: Screen<Props, Screens.JOIN> = ({
  navigation,
  user,
  route,
  joinGroupUseCase,
}) => {
  const { groupID } = route.params

  const { handleJoinGroup, isProcessing } = useJoinViewModel({
    user: user!,
    groupID,
    joinGroupUseCase,
  })

  const navigateToGroup = () =>
    navigation.dispatch(
      CommonActions.reset({
        routes: [
          {
            name: Screens.HOME,
          },
          {
            name: Screens.GROUP,
            params: {
              groupID,
            },
          },
        ],
        index: 1,
      }),
    )
  const handleIgnore = () => navigation.pop()
  const handleJoin = async () => {
    await handleJoinGroup()
    navigateToGroup()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You're invited to join the group "Hello, world!"
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          minWidth={150}
          primary={false}
          onPress={handleIgnore}
          disabled={isProcessing}
        >
          Ignore
        </Button>
        <Button
          style={styles.joinButton}
          minWidth={150}
          disabled={isProcessing}
          onPress={handleJoin}
          primary
        >
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
