import faker from 'faker'

import { LoadsurveyListModel } from '@/domain/usecases'

const mockSurvey = (): LoadsurveyListModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

const mockSurveyList = (): LoadsurveyListModel[] => [
  mockSurvey(),
  mockSurvey(),
  mockSurvey(),
  mockSurvey(),
  mockSurvey(),
  mockSurvey()
]

export { mockSurveyList, mockSurvey }
