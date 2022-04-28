import React from 'react'

import { render, screen } from '@testing-library/react'

import { mockSurvey } from '@/domain/test'
import { Survey, IconName } from '@/presentation/components'

const SystemUnderTestCreator = (survey = mockSurvey()): void => {
  render(<Survey survey={survey} />)
}

describe('SurveyComponent', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurvey(), {
      didAnswer: true,
      date: new Date('2022-04-25T00:00:00')
    })
    SystemUnderTestCreator(survey)
    expect(screen.getByTestId('icon-status')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('survey-question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('survey-day')).toHaveTextContent('25')
    expect(screen.getByTestId('survey-month')).toHaveTextContent('abr')
    expect(screen.getByTestId('survey-year')).toHaveTextContent('2022')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurvey(), {
      didAnswer: false,
      date: new Date('2020-09-03T00:00:00')
    })
    SystemUnderTestCreator(survey)
    expect(screen.getByTestId('icon-status')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('survey-question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('survey-day')).toHaveTextContent('03')
    expect(screen.getByTestId('survey-month')).toHaveTextContent('set')
    expect(screen.getByTestId('survey-year')).toHaveTextContent('2020')
  })
})
