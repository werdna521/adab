import { useEffect } from 'react'
import Tts from 'react-native-tts'

import { Status, useInput, useStatus } from '../common/hooks'

const GOOGLE_ENGINE = 'com.google.android.tts'

export const useTextToSpeechViewModel = () => {
  const { isProcessing, setStatus } = useStatus()
  const { inputData, handleInputTextChange } = useInput({
    text: '',
  })

  useEffect(() => {
    Tts.getInitStatus().then(
      () => {
        Tts.engines().then((engines) => {
          const hasGoogleEngine = engines.some(
            ({ name }) => name === GOOGLE_ENGINE,
          )
          const engine = hasGoogleEngine ? GOOGLE_ENGINE : engines?.[0]?.name
          Tts.setDefaultEngine(engine)
        })
      },
      (err) => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine()
        }
      },
    )
  }, [])

  useEffect(() => {
    Tts.addEventListener('tts-start', () => {
      setStatus(Status.PROCESSING)
    })
    Tts.addEventListener('tts-finish', () => {
      setStatus(Status.SUCCESS)
      handleInputTextChange('text')('')
    })

    return () => {
      Tts.removeAllListeners('tts-finish')
      Tts.removeAllListeners('tts-start')
    }
  }, [handleInputTextChange, setStatus])

  const handleTextToSpeech = () => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('id-ID')
      Tts.speak(inputData.text)
    })
  }

  return {
    text: inputData.text,
    isProcessing,
    handleInputTextChange,
    handleTextToSpeech,
  }
}
