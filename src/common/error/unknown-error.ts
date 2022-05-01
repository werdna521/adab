export default class UnknownError extends Error {
  constructor(error: any) {
    super('Unknown Error')
    this.name = 'Unknown Error'
    this.stack = JSON.stringify(error)
  }
}
