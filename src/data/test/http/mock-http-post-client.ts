import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols'

class HttpPostClientSpy<B, R> implements HttpPostClient<B, R> {
  url?: string
  body?: B
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostParams<B>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return await Promise.resolve(this.response)
  }
}

export { HttpPostClientSpy }
