import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/test'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0
  surveys: SurveyModel[] = mockSurveyList()

  async load(): Promise<SurveyModel[]> {
    this.callsCount++

    return this.surveys
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
  test('Should present 6 empty items on start', async () => {
    SystemUnderTestCreator()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => expect(surveyList.querySelectorAll('li:empty')).toHaveLength(6))
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = SystemUnderTestCreator()
    await waitFor(() => expect(loadSurveyListSpy.callsCount).toBe(1))
  })

  test('Should render SurveyItems on success', async () => {
    SystemUnderTestCreator()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => expect(surveyList.querySelectorAll('li.surveyWrapper')).toHaveLength(6))
  })
})
