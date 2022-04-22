import { HttpGetClient, HttpGetParams, HttpResponse, HttpStatusCode } from '@/data/protocols'

class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get({ url }: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = url
    return this.response
  }
}

export { HttpGetClientSpy }
