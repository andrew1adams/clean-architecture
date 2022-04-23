import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols'

class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return await Promise.resolve(this.response)
  }
}

export { HttpPostClientSpy }
