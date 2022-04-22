import { HttpGetClient } from '@/data/protocols'

class RemoteLoadSurveyList {
  private readonly url: string
  private readonly httpGetClient: HttpGetClient

  constructor(url: string, httpGetClient: HttpGetClient) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async load(): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}

export { RemoteLoadSurveyList }
