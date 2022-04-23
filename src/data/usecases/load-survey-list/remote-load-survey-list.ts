import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/error'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'

class RemoteLoadSurveyList implements LoadSurveyList {
  private readonly url: string
  private readonly httpGetClient: HttpGetClient<SurveyModel[]>

  constructor(url: string, httpGetClient: HttpGetClient<SurveyModel[]>) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async load(): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      default:
        throw new UnexpectedError()
    }
  }
}

export { RemoteLoadSurveyList }
