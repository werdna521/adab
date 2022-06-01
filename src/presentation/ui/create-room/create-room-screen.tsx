import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'

import { User } from '~/domain/model'
import CreateRoomUseCase from '~/interactor/room/create-room-use-case'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button, InputGroup } from '../common/components'
import { useCreateRoomViewModel } from './create-room-view-model'

type Props = {
  user: User
  createRoomUseCase: CreateRoomUseCase
}

const CreateRoomScreen: Screen<Props, Screens.CREATE_ROOM> = ({
  route,
  navigation,
  createRoomUseCase,
}) => {
  const { group } = route.params
  const { globalError, isProcessing, handleCreateRoom, handleInputTextChange } =
    useCreateRoomViewModel({ createRoomUseCase, groupID: group.uid })

  const navigateToRoom = () => navigation.pop()
  const handleClick = async () => {
    await handleCreateRoom()
    navigateToRoom()
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        style={styles.illustration}
        source={require('~/assets/illustration/balloon.png')}
      />
      <Text style={styles.prompt}>What's your room name?</Text>
      <InputGroup
        style={styles.input}
        onChangeText={handleInputTextChange('title')}
        error={globalError}
      />
      <Button style={styles.cta} onPress={handleClick} disabled={isProcessing}>
        Continue
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  contentContainer: {
    paddingTop: getNotchSize() + 20,
    paddingHorizontal: 20,
  },
  prompt: {
    marginTop: 56,
    fontSize: 24,
    color: '#1d2d48',
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    marginTop: 8,
  },
  illustration: {
    marginTop: 32,
    width: 100,
    height: undefined,
    aspectRatio: 8 / 19,
    alignSelf: 'center',
  },
  cta: {
    marginTop: 48,
    marginBottom: 32,
  },
})

export default CreateRoomScreen
