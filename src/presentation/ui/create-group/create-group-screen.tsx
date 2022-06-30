import React from 'react'
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'

import { CreateGroupUseCase } from '~/interactor/group'
import { getColor } from '~/presentation/colors'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

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
  const { isLowVisionMode } = useTheme()

  const navigateToGroup = () => navigation.navigate(Screens.GROUP_LIST)
  const handleClick = async () => {
    await handleCreateGroup()
    navigateToGroup()
    ToastAndroid.show('Group Created', ToastAndroid.SHORT)
  }

  return (
    <ScrollView
      style={styles(isLowVisionMode).container}
      contentContainerStyle={styles(isLowVisionMode).contentContainer}
    >
      <Text style={styles(isLowVisionMode).title}>Create Group</Text>
      <Text style={styles(isLowVisionMode).description}>
        A Group is like a folder where your rooms/sessions live. Only invited
        members will have access to the Group. You can also add an optional
        label to group multiple Groups together for easy access.
      </Text>
      <View style={styles(isLowVisionMode).form}>
        <InputGroup
          style={styles(isLowVisionMode).input}
          label="Group Name"
          onChangeText={handleInputTextChange('groupName')}
          error={globalError}
        />
        <InputGroup
          style={styles(isLowVisionMode).input}
          label="Label (optional)"
          onChangeText={handleInputTextChange('label')}
          error={globalError}
        />
      </View>
      <View style={styles(isLowVisionMode).ctaContainer}>
        <Button
          style={styles(isLowVisionMode).cta}
          onPress={handleClick}
          disabled={isProcessing}
          primary
        >
          Continue
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
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
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
    },
    description: {
      fontSize: 14,
      fontFamily: 'Satoshi-Mediuml',
      color: getColor('#aaa', isLowVisionMode),
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
