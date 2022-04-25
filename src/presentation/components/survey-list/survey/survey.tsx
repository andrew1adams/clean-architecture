import { SurveyModel } from '@/domain/models'
import { Icon } from '@/presentation/components'
import React from 'react'
import styles from './survey.module.scss'

const { surveyWrapper, surveyContent, day, month, year, iconWrapper } = styles

type Props = {
  survey: SurveyModel
}

const Survey: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={surveyWrapper}>
      <div className={surveyContent}>
        <Icon iconName='thumbUp' className={iconWrapper} />
        <time>
          <span className={day} data-testid='survey-day'>
            {survey.date.getDate()}
          </span>
          <span className={month} data-testid='survey-month'>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span className={year} data-testid='survey-year'>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid='survey-question'>{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export { Survey }
