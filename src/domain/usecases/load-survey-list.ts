import { SurveyModel } from '@/domain/models'

interface LoadSurveyList {
  load: () => Promise<SurveyModel[]>
}

export { LoadSurveyList }
