import { useState } from 'react'

type Params<Schema> = Schema

export const useInput = <Schema extends Record<string, any>>(
  params: Params<Schema>,
) => {
  const { defaultValue } = params

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
