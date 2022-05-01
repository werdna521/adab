import Result from './result'

export default interface UseCase<Params, Return> {
  invoke: (params: Params) => Promise<Result<Return>>
}
