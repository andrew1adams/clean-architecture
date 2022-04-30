import { RemoteLoadSurveyList } from '@/data/usecases'
import { LoadSurveyList } from '@/domain/usecases'
import { AxiosHttpClientCreator, ApiURLCreator } from '@/main/factories'

const RemoteLoadSurveyListCreator = (): LoadSurveyList =>
  new RemoteLoadSurveyList(ApiURLCreator('/surveys'), AxiosHttpClientCreator())

export { RemoteLoadSurveyListCreator }
