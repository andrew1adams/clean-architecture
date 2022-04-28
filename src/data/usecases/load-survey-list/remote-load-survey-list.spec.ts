import faker from 'faker'

import { HttpStatusCode } from '@/data/protocols'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyList } from '@/data/usecases'
import { UnexpectedError } from '@/domain/error'
import { SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/test'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const SystemUnderTestCreator = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = SystemUnderTestCreator(url)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = SystemUnderTestCreator()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = SystemUnderTestCreator()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = SystemUnderTestCreator()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an SurveyList if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = SystemUnderTestCreator()
    const httpResult = mockSurveyList()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const surveyList = await sut.load()
    expect(surveyList).toEqual(httpResult)
  })

  test('Should return an empty SurveyList if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = SystemUnderTestCreator()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const surveyList = await sut.load()
    expect(surveyList).toEqual([])
  })
})
