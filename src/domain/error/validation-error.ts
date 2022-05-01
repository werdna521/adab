export default class ValidationError extends Error {
  public fields: Record<string, string>

  constructor(fields: Record<string, string>) {
    super('Validation Error')
    this.name = 'Validation Error'
    this.fields = fields
  }
}
