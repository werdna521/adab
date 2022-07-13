import { useInput, useStatus } from '../common/hooks'

export const useTextToSpeechViewModel = () => {
  const { isProcessing } = useStatus()
  const { inputData, handleInputTextChange } = useInput({
    text: '',
  })

  return {
    isProcessing,
    handleInputTextChange,
  }
}
