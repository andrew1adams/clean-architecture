import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callsCount: number = 0

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}

export { AddAccountSpy }
