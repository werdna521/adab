import { useState } from 'react'

export enum Status {
  INITIAL = 'INITIAL',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const useStatus = () => {
  const [status, setStatus] = useState(Status.INITIAL)
  const isInitial = status === Status.INITIAL
  const isProcessing = status === Status.PROCESSING
  const isSuccess = status === Status.SUCCESS
  const isError = status === Status.ERROR

  return { status, setStatus, isInitial, isProcessing, isSuccess, isError }
}
