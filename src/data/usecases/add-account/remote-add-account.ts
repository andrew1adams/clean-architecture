import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { EmailInUseError, UnexpectedError } from '@/domain/error'
import { AddAccount, AddAccountModel, AddAccountParams } from '@/domain/usecases'

type RemoteAddAccountModel = AddAccountModel
class RemoteAddAccount implements AddAccount {
  private readonly url: string
  private readonly httpPostClient: HttpPostClient<RemoteAddAccountModel>

  constructor(url: string, httpPostClient: HttpPostClient<RemoteAddAccountModel>) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async add(params: AddAccountParams): Promise<RemoteAddAccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}

export { RemoteAddAccount, RemoteAddAccountModel }
