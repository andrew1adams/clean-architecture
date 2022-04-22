import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyList } from '@/data/usecases'
import faker from 'faker'

describe('Remote Load Survey List', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
