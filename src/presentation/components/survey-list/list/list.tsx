import React, { useContext } from 'react'
import { SurveyModel } from '@/domain/models'
import { SurveySkeleton } from '../survey-skeleton/survey-skeleton'
import { Survey } from '../survey/survey'
import { SurveyContext } from '@/presentation/contexts'
import styles from './survey-list.module.scss'

const { listWrapper } = styles

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={listWrapper} data-testid='survey-list'>
      {state.surveys.length
        ? (
            state.surveys.map((survey: SurveyModel) => <Survey survey={survey} key={survey.id} />)
          )
        : (
        <SurveySkeleton />
          )}
    </ul>
  )
}

export { List }
