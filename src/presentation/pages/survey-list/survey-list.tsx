import { Footer, Header } from '@/presentation/components'
import React from 'react'
import { Survey, SurveySkeleton } from './components'
import styles from './survey-list.module.scss'

const { surveyListWrapper, contentWrapper } = styles

const SurveyList: React.FC = () => {
  return (
    <div className={surveyListWrapper}>
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
