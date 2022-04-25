import { Footer, Header, Survey, SurveySkeleton } from '@/presentation/components'
import React from 'react'
import styles from './survey-list.module.scss'

const { surveyListWrapper, contentWrapper } = styles

const SurveyList: React.FC = () => {
  return (
    <div className={surveyListWrapper} data-testid='survey-list'>
      <Header />
      <div className={contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <Survey />
          <SurveySkeleton />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
