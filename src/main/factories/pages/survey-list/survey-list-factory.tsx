import React from 'react'

import { SurveyList } from '@/presentation/pages'

import { RemoteLoadSurveyListCreator } from '../../usecases/load-survey-list/remote-load-survey-list-factory'

const SurveyListComponent: React.FC = () => (
  <SurveyList loadSurveyList={RemoteLoadSurveyListCreator()} />
)

export { SurveyListComponent }
