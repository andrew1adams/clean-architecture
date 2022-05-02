import { GetStorage, HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols'

class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  private readonly getStorage: GetStorage
  private readonly httpGetClient: HttpGetClient

  constructor(getStorage: GetStorage, httpGetClient: HttpGetClient) {
    this.getStorage = getStorage
    this.httpGetClient = httpGetClient
  }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          'x-access-token': account.accessToken
        }
      })
    }
    await this.httpGetClient.get(params)
    return null
  }
}

export { AuthorizeHttpGetClientDecorator }
