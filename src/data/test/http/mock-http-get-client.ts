import { HttpGetClient, HttpGetParams, HttpResponse, HttpStatusCode } from '@/data/protocols'

class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get({ url, headers }: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = url
    this.headers = headers
    return this.response
  }
}

export { HttpGetClientSpy }
