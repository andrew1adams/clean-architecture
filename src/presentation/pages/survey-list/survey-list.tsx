import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header, Survey, SurveySkeleton } from '@/presentation/components'
import React, { useEffect } from 'react'
import styles from './survey-list.module.scss'

const { surveyListWrapper, contentWrapper } = styles

type Props = {
  loadSurveyList: LoadSurveyList
}

type StateProps = {
  surveys: SurveyModel[]
  error: string
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = React.useState<StateProps>({
    surveys: [],
    error: ''
  })

  useEffect(() => {
    loadSurveyList
      .load()
      .then(surveys => setState({ ...state, surveys }))
      .catch(err => setState({ ...state, error: err.message }))
  }, [])

  return (
    <div className={surveyListWrapper}>
      <Header />
      <div className={contentWrapper}>
        <h2>Enquetes</h2>
        {state.error
          ? (
          <div>
            <span data-testid='error-wrapper'>{state.error}</span>
            <button>Recarregar</button>
          </div>
            )
          : (
          <ul data-testid='survey-list'>
            {state.surveys.length
              ? (
                  state.surveys.map((survey: SurveyModel) => <Survey survey={survey} key={survey.id} />)
                )
              : (
              <SurveySkeleton />
                )}
          </ul>
            )}
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
