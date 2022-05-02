import { mockAddAccountModel } from '@/domain/test'
import { AddAccount, AddAccountModel, AddAccountParams } from '@/domain/usecases'

class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params: AddAccountParams
  callsCount: number = 0

  async add(params: AddAccountParams): Promise<AddAccountModel> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}

export { AddAccountSpy }
