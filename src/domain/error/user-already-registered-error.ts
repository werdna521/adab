export default class UserAlreadyRegistered extends Error {
  constructor(message = 'User Already Registered') {
    super(message)
    this.name = 'User Already Registered'
  }
}
