import { useState } from 'react'

export const useInput = <Schema extends Record<string, any>>(
  defaultValue: Schema,
) => {
  const [inputData, setInputData] = useState<Schema>(defaultValue)

  const handleInputTextChange = (key: keyof Schema) => (text: string) => {
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
