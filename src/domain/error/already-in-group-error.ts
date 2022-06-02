export default class AlreadyInGroupError extends Error {
  constructor() {
    super('Already In Group')
    this.name = 'Already In Group'
  }
}
