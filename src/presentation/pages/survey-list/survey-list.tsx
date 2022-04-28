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
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = React.useState<StateProps>({
    surveys: []
  })

  useEffect(() => {
    loadSurveyList.load().then(surveys => setState({ surveys }))
  }, [])

  return (
    <div className={surveyListWrapper}>
      <Header />
      <div className={contentWrapper}>
        <h2>Enquetes</h2>
        <ul data-testid='survey-list'>
          {state.surveys.length
            ? (
                state.surveys.map((survey: SurveyModel) => <Survey survey={survey} key={survey.id} />)
              )
            : (
            <SurveySkeleton />
              )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
