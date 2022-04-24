import { Footer, Header } from '@/presentation/components'
import React from 'react'
import styles from './survey-list.module.scss'

const { surveyListWrapper, contentWrapper, surveyContent, day, month, year, iconWrapper, red } =
  styles

const SurveyList: React.FC = () => {
  const getStatus = (): string => `${red}`

  return (
    <div className={surveyListWrapper}>
      <Header />
      <div className={contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={surveyContent}>
              <div className={`${iconWrapper} ${getStatus()}`}>
                <img
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA70lEQVQ4Ea2RPQoCQQyFZ/w5g72lYOEVPIiV2IkIHmCvIZ5D77BgZWtrYWe1ICiuL8tEwjIZZmYNZCf7knyTzRrjrK7rAfwAr+AheyNZwiei98gNrBkISxYjz5KbZb0V4gXxlN8jzo+1tk91BOT6nhPmOFNg1Nb0UiCNxY0Uu8QW044BuMIZHs3DJzcra3/yOgem3UoT3pEcaQUh3TchAX9/KNTsy/mAtLebrzhXI+AqE/oQl55ErIfYxp5WothW71QyAJ0VWKG06DJAQ/jTA0yH0TUAzf4Gc8BFC5g3GcHI3IQvBy0asesDsB08CfYFB/44kX6+Hj8AAAAASUVORK5CYII='
                  alt='Icon'
                />
              </div>
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
