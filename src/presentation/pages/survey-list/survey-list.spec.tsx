import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'

const SystemUnderTestCreator = (): void => {
  render(<SurveyList />)
}

describe('SurveyListcomponent', () => {
  test('Should present 6 empty items on start', () => {
    SystemUnderTestCreator()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(6)
  })
})
