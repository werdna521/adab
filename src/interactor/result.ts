type Result<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: Error
    }

export default Result
