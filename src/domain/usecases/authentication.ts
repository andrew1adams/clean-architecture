import { AccountModel } from '@/domain/models'

type AuthenticationParams = {
  email: string
  password: string
}

type AuthenticationModel = AccountModel

interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AuthenticationModel>
}

export { Authentication, AuthenticationParams, AuthenticationModel }
