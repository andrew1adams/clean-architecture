import React from 'react'
import { render, screen } from '@testing-library/react'
import { Survey, IconName } from '@/presentation/components'
import { mockSurvey } from '@/domain/test'

describe('SurveyComponent', () => {
  test('Should render with correct values', () => {
    const survey = mockSurvey()
    survey.didAnswer = true
    survey.date = new Date('2022-04-25T00:00:00')
    render(<Survey survey={survey} />)
    expect(screen.getByTestId('icon-status')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('survey-question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('survey-day')).toHaveTextContent('25')
    expect(screen.getByTestId('survey-month')).toHaveTextContent('abr')
    expect(screen.getByTestId('survey-year')).toHaveTextContent('2022')
  })
})
