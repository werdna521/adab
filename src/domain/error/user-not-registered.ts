export default class UserNotRegisteredError extends Error {
  constructor(message = 'User Not Registered') {
    super(message)
    this.name = 'User Not Registered'
  }
}
