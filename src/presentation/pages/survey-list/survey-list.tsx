import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header, SurveySkeleton } from '@/presentation/components'
import React, { useEffect } from 'react'
import styles from './survey-list.module.scss'

const { surveyListWrapper, contentWrapper } = styles

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    ;(async () => await loadSurveyList.load())()
  }, [])

  return (
    <div className={surveyListWrapper} data-testid='survey-list'>
      <Header />
      <div className={contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <SurveySkeleton />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
