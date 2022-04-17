import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { EmailInUseError, UnexpectedError } from '@/domain/error'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

class RemoteAddAccount implements AddAccount {
  private readonly url: string
  private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>

  constructor(url: string, httpPostClient: HttpPostClient<AddAccountParams, AccountModel>) {
    this.url = url
    this.httpPostClient = httpPostClient
  }
  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return null
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}

export { RemoteAddAccount }
