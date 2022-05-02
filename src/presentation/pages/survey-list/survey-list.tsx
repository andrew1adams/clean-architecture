import React, { useEffect } from 'react'

import { LoadSurveyList, LoadsurveyListModel } from '@/domain/usecases'
import { Footer, Header, List, SurveyError } from '@/presentation/components'
import { SurveyContext } from '@/presentation/contexts'

import styles from './survey-list.module.scss'

const { surveyListWrapper, contentWrapper } = styles

type Props = {
  loadSurveyList: LoadSurveyList
}

type StateProps = {
  surveys: LoadsurveyListModel[]
  error: string
  isReload: boolean
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = React.useState<StateProps>({
    surveys: [],
    error: '',
    isReload: false
  })

  useEffect(() => {
    loadSurveyList
      .load()
      .then(surveys => setState({ ...state, surveys }))
      .catch(err => setState({ ...state, error: err.message }))
  }, [state.isReload])

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
