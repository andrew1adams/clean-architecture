import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

class AddAccountSpy implements AddAccount {
  params: AddAccountParams
  callsCount: number = 0

  add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return null
  }
}

export { AddAccountSpy }
