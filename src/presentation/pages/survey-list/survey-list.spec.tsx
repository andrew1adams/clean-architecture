import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  async load(): Promise<SurveyModel[]> {
    this.callsCount++

    return []
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const SystemUnderTestCreator = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy
  }
}

describe('SurveyListcomponent', () => {
  test('Should present 6 empty items on start', () => {
    SystemUnderTestCreator()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(6)
  })

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = SystemUnderTestCreator()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
