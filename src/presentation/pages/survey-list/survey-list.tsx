import { Footer, Logo } from '@/presentation/components'
import React from 'react'
import styles from './survey-list.module.scss'

const {
  surveyListWrapper,
  headerWrapper,
  headerContent,
  logoutWrapper,
  contentWrapper,
  surveyContent,
  day,
  month,
  year
} = styles

const SurveyList: React.FC = () => {
  return (
    <div className={surveyListWrapper}>
      <header className={headerWrapper}>
        <div className={headerContent}>
          <Logo />
          <div className={logoutWrapper}>
            <span>Username</span>
            <a href='#'>Sair</a>
          </div>
        </div>
      </header>
      <div className={contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={surveyContent}>
              <time>
                <span className={day}>20</span>
                <span className={month}>04</span>
                <span className={year}>2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={surveyContent}>
              <time>
                <span className={day}>20</span>
                <span className={month}>04</span>
                <span className={year}>2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={surveyContent}>
              <time>
                <span className={day}>20</span>
                <span className={month}>04</span>
                <span className={year}>2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={surveyContent}>
              <time>
                <span className={day}>20</span>
                <span className={month}>04</span>
                <span className={year}>2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={surveyContent}>
              <time>
                <span className={day}>20</span>
                <span className={month}>04</span>
                <span className={year}>2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
