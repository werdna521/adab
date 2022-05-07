export default interface SubscriptionUseCase<Callback, Unsubscribe> {
  invoke: (callback: Callback) => Unsubscribe
}
