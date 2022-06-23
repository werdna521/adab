import { Alert } from 'react-native'

import { UnknownError } from '~/common/error'
import EditTranscriptUseCase from '~/interactor/room/edit-transcript-use-case'

import { Status, useInput, useStatus } from '../common/hooks'

type Params = {
  editTranscriptUseCase: EditTranscriptUseCase
  initialContent: string
  groupID: string
  roomID: string
}

export const useEditTranscriptViewModel = (params: Params) => {
  const { editTranscriptUseCase, initialContent, groupID, roomID } = params

  const { isProcessing, isSuccess, setStatus } = useStatus()

  const { inputData, handleInputTextChange } = useInput({
    content: initialContent,
  })

  const handleEditTranscript = async () => {
    Alert.alert(
      'Alert',
      'Saving will overwrite your transcript history. Do you want to proceed?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setStatus(Status.PROCESSING)

            const { error } = await editTranscriptUseCase.invoke({
              groupID,
              roomID,
              content: inputData.content,
            })
            if (error instanceof UnknownError) {
              setStatus(Status.ERROR)
              return
            }

            setStatus(Status.SUCCESS)
          },
        },
      ],
    )
  }

  return {
    handleInputTextChange,
    handleEditTranscript,
    content: inputData.content,
    isProcessing,
    isSuccess,
  }
}
