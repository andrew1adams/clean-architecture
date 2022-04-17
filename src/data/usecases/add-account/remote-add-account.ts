import { HttpPostClient } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

class RemoteAddAccount implements AddAccount {
  private readonly url: string
  private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>

  constructor(url: string, httpPostClient: HttpPostClient<AddAccountParams, AccountModel>) {
    this.url = url
    this.httpPostClient = httpPostClient
  }
  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    return mockAccountModel()
  }
}

export { RemoteAddAccount }
