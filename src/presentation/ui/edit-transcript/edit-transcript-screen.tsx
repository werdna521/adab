import { CommonActions } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import EditTranscriptUseCase from '~/interactor/room/edit-transcript-use-case'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button } from '../common/components'
import { useEditTranscriptViewModel } from './edit-transcript-view-model'

type Props = {
  editTranscriptUseCase: EditTranscriptUseCase
}

const EditTranscriptScreen: Screen<Props, Screens.EDIT_TRANSCRIPT> = ({
  editTranscriptUseCase,
  route,
  navigation,
}) => {
  const { room, group } = route.params

  const {
    handleInputTextChange,
    handleEditTranscript,
    content,
    isSuccess,
    isProcessing,
  } = useEditTranscriptViewModel({
    editTranscriptUseCase,
    groupID: group.uid,
    initialContent: room.content,
    roomID: room.uid,
  })

  useEffect(() => {
    if (isSuccess) {
      navigation.dispatch(
        CommonActions.reset({
          routes: [
            {
              name: Screens.HOME,
            },
            {
              name: Screens.GROUP,
              params: {
                groupID: group.uid,
              },
            },
            {
              name: Screens.ROOM,
              params: {
                room: {
                  ...room,
                  content,
                },
                group,
              },
            },
          ],
        }),
      )
    }
  }, [navigation, group, room, isSuccess, content])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{room.title}</Text>
      <ScrollView style={styles.scrollView} keyboardDismissMode="interactive">
        <TextInput
          style={styles.content}
          defaultValue={room.content}
          onChangeText={handleInputTextChange('content')}
          multiline
        />
      </ScrollView>
      <Button
        style={styles.editButton}
        onPress={handleEditTranscript}
        disabled={isProcessing}
        primary
      >
        Save
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize() + 20,
    backgroundColor: '#2c2c2c',
  },
  title: {
    fontSize: 18,
    color: '#f3f2ed',
    fontWeight: '700',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3c3c3c',
    paddingBottom: 20,
  },
  scrollView: {
    paddingTop: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 16,
    color: 'white',
    padding: 0,
  },
  editButton: {
    marginBottom: 24,
  },
})

export default EditTranscriptScreen
