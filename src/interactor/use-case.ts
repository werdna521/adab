export default interface UseCase<Params, Return> {
  invoke: (params: Params) => Promise<Return>
}
