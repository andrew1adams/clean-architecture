import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/error'

class RemoteLoadSurveyList {
  private readonly url: string
  private readonly httpGetClient: HttpGetClient

  constructor(url: string, httpGetClient: HttpGetClient) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async load(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      default:
        throw new UnexpectedError()
    }
  }
}

export { RemoteLoadSurveyList }
