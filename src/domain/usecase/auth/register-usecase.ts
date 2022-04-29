import { UseCase } from '../usecase'

type Params = {}
type Return = unknown

export default class RegisterUseCase implements UseCase<Params, Return> {
  async invoke(_: Params = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('register')
        resolve('')
      }, 5000)
    })
  }
}
