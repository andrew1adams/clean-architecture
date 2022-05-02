import { AccountModel } from '@/domain/models'

type AddAccountModel = AccountModel

type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
interface AddAccount {
  add: (params: AddAccountParams) => Promise<AddAccountModel>
}

export { AddAccountModel, AddAccountParams, AddAccount }
