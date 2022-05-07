export default class WrongCredentialError extends Error {
  constructor(message = 'Wrong Credential') {
    super(message)
    this.name = 'Wrong Credential'
  }
}
