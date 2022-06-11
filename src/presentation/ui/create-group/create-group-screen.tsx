import React from 'react'
import { Image, ScrollView, StyleSheet, Text } from 'react-native'

import { CreateGroupUseCase } from '~/interactor/group'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button, InputGroup } from '../common/components'
import { useCreateGroupViewModel } from './create-group-view-model'

type Props = {
  createGroupUseCase: CreateGroupUseCase
}

const CreateGroupScreen: Screen<Props, Screens.CREATE_GROUP> = ({
  createGroupUseCase,
  navigation,
  user,
}) => {
  const {
    handleInputTextChange,
    handleCreateGroup,
    globalError,
    isProcessing,
  } = useCreateGroupViewModel({
    createGroupUseCase,
    user: user!,
  })

  const navigateToGroup = () => navigation.navigate(Screens.HOME)
  const handleClick = async () => {
    await handleCreateGroup()
    navigateToGroup()
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
      <Text style={styles.prompt}>What do you want to name your group?</Text>
      <InputGroup
        style={styles.input}
        onChangeText={handleInputTextChange('groupName')}
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
    paddingTop: getNotchSize() + 16,
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

export default CreateGroupScreen
