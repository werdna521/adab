import { AuthRepository } from '~/domain/repository'
import {
  AuthStateCallback,
  Unsubscribe,
} from '~/domain/repository/auth-repository'

import SubscriptionUseCase from '../subscription-use-case'

export default class SubscribeAuthStateUseCase
  implements SubscriptionUseCase<AuthStateCallback, Unsubscribe>
{
  constructor(private authRepository: AuthRepository) {}

  invoke(callback: AuthStateCallback): Unsubscribe {
    return this.authRepository.subscribeToAuthState(callback)
  }
}
