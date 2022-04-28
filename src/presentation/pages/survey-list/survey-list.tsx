import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header, List, SurveyError } from '@/presentation/components'
import { SurveyContext } from '@/presentation/contexts'
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
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyError /> : <List />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
