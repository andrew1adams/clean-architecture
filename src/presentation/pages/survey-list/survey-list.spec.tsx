import React from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { UnexpectedError } from '@/domain/error'
import { SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyList } from '@/presentation/pages'

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

const SystemUnderTestCreator = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy
  }
}

describe('SurveyListcomponent', () => {
  test('Should present 6 empty items on start', async () => {
    SystemUnderTestCreator()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li:empty')).toHaveLength(6)
      expect(screen.queryByTestId('error-wrapper')).not.toBeInTheDocument()
    })
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = SystemUnderTestCreator()
    await waitFor(() => expect(loadSurveyListSpy.callsCount).toBe(1))
  })

  test('Should render SurveyItems on success', async () => {
    SystemUnderTestCreator()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li.surveyWrapper')).toHaveLength(6)
      expect(screen.queryByTestId('error-wrapper')).not.toBeInTheDocument()
    })
  })

  test('Should render Error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(error)
    SystemUnderTestCreator(loadSurveyListSpy)

    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.queryByTestId('error-wrapper')).toHaveTextContent(error.message)
    })
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    SystemUnderTestCreator(loadSurveyListSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    })
    fireEvent.click(screen.getByTestId('reload-btn'))
    await waitFor(() => expect(loadSurveyListSpy.callsCount).toBe(1))
  })
})
