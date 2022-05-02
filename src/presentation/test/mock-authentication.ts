import { mockAuthenticationModel } from '@/domain/test'
import { Authentication, AuthenticationModel, AuthenticationParams } from '@/domain/usecases'

class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params: AuthenticationParams
  callsCount: number = 0

  async auth(params: AuthenticationParams): Promise<AuthenticationModel> {
    this.params = params
    this.callsCount++

    return await Promise.resolve(this.account)
  }
}

export { AuthenticationSpy }
