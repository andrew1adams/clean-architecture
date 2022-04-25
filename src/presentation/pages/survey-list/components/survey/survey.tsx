import { Icon } from '@/presentation/components'
import React from 'react'
import styles from './survey.module.scss'

const { surveyWrapper, surveyContent, day, month, year, iconWrapper } = styles

const Survey: React.FC = () => {
  return (
    <li className={surveyWrapper}>
      <div className={surveyContent}>
        <Icon iconName='thumbDown' className={iconWrapper} />
        <time>
          <span className={day}>20</span>
          <span className={month}>04</span>
          <span className={year}>2022</span>
        </time>
        <p>Qual é o seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export { Survey }
