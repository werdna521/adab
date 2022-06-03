export default class CannotEndMeetingError extends Error {
  constructor() {
    super('Cannot End Meeting')
    this.name = 'Cannot End Meeting'
  }
}
