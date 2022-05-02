type LoadsurveyListModel = {
  id: string
  question: string
  date: Date
  didAnswer: boolean
}

interface LoadSurveyList {
  load: () => Promise<LoadsurveyListModel[]>
}

export { LoadSurveyList, LoadsurveyListModel }
