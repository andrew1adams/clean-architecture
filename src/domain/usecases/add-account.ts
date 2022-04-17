import { AccountModel } from '@/domain/models'

type AddAccountParams = {
  email: string
  password: string
  passwordConfirmation: string
}

interface AddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}

export { AddAccountParams, AddAccount }
