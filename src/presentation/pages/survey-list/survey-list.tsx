import { Footer, Header, Icon } from '@/presentation/components'
import React from 'react'
import styles from './survey-list.module.scss'

const { surveyListWrapper, contentWrapper, surveyContent, day, month, year, iconWrapper } = styles

const SurveyList: React.FC = () => {
  return (
    <div className={surveyListWrapper}>
      <Header />
      <div className={contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
