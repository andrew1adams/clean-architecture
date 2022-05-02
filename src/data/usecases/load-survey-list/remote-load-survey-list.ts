import { HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/error'
import { LoadSurveyList, LoadsurveyListModel } from '@/domain/usecases'

type RemoteLoadSurveyListModel = LoadsurveyListModel
class RemoteLoadSurveyList implements LoadSurveyList {
  private readonly url: string
  private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyListModel[]>

  constructor(url: string, httpGetClient: HttpGetClient<RemoteLoadSurveyListModel[]>) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async load(): Promise<RemoteLoadSurveyListModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

export { RemoteLoadSurveyList, RemoteLoadSurveyListModel }
