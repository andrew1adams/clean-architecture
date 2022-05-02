import React, { useContext } from 'react'

import { LoadsurveyListModel } from '@/domain/usecases'
import { SurveyContext } from '@/presentation/contexts'

import { SurveySkeleton } from '../survey-skeleton/survey-skeleton'
import { Survey } from '../survey/survey'
import styles from './list.module.scss'

const { listWrapper } = styles

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={listWrapper} data-testid='survey-list'>
      {state.surveys.length
        ? (
            state.surveys.map((survey: LoadsurveyListModel) => (
          <Survey survey={survey} key={survey.id} />
            ))
          )
        : (
        <SurveySkeleton />
          )}
    </ul>
  )
}

export { List }
