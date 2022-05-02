import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/error'
import { Authentication, AuthenticationModel, AuthenticationParams } from '@/domain/usecases'

type RemoteAuthenticationModel = AuthenticationModel
class RemoteAuthentication implements Authentication {
  private readonly url: string
  private readonly httpPostClient: HttpPostClient<RemoteAuthenticationModel>

  constructor(url: string, httpPostClient: HttpPostClient<RemoteAuthenticationModel>) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async auth(params: AuthenticationParams): Promise<RemoteAuthenticationModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}

export { RemoteAuthentication }
