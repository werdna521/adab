import { useState } from 'react'

export const useInput = <Schema extends Record<string, any>>(
  defaultValue: Schema,
) => {
  const [inputData, setInputData] = useState<Schema>(defaultValue)

  const handleInputTextChange =
    (key: keyof Schema) => (text: Schema[typeof key]) => {
      setInputData((prevState) => ({
        ...prevState,
        [key]: text,
      }))
    }

  return {
    inputData,
    handleInputTextChange,
  }
}
