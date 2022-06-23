import React from 'react'
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'

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

  const navigateToGroup = () => navigation.navigate(Screens.GROUP_LIST)
  const handleClick = async () => {
    await handleCreateGroup()
    navigateToGroup()
    ToastAndroid.show('Group Created', ToastAndroid.SHORT)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Create Group</Text>
      <Text style={styles.description}>
        A Group is like a folder where your rooms/sessions live. Only invited
        members will have access to the Group. You can also add an optional
        label to group multiple Groups together for easy access.
      </Text>
      <View style={styles.form}>
        <InputGroup
          style={styles.input}
          label="Group Name"
          onChangeText={handleInputTextChange('groupName')}
          error={globalError}
        />
        <InputGroup
          style={styles.input}
          label="Label (optional)"
          onChangeText={handleInputTextChange('label')}
          error={globalError}
        />
      </View>
      <View style={styles.ctaContainer}>
        <Button
          style={styles.cta}
          onPress={handleClick}
          disabled={isProcessing}
        >
          Continue
        </Button>
      </View>
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
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    color: '#101010',
    fontFamily: 'Satoshi-Bold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Satoshi-Mediuml',
    color: '#aaa',
    marginTop: 4,
  },
  form: {
    marginTop: 24,
  },
  input: {
    marginTop: 12,
  },
  ctaContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  cta: {
    marginTop: 144,
    marginBottom: 32,
  },
})

export default CreateGroupScreen
