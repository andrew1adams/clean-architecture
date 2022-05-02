import { GetStorage, HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols'

class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  private readonly getStorage: GetStorage

  constructor(getStorage: GetStorage) {
    this.getStorage = getStorage
  }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    this.getStorage.get('account')
    return null
  }
}

export { AuthorizeHttpGetClientDecorator }
