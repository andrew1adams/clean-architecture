import { mockPostRequest } from '@/data/test'
import { AxiosHttpClient } from '@/infra/protocols'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const SystemUnderTestCreator = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('Axios Http Client', () => {
  describe('Post Method', () => {
    test('Should call axios.post post with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = SystemUnderTestCreator()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response on axios.post', () => {
      const { sut, mockedAxios } = SystemUnderTestCreator()
      const httpResponse = sut.post(mockPostRequest())
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return correct error on axios.post', () => {
      const { sut, mockedAxios } = SystemUnderTestCreator()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const httpResponse = sut.post(mockPostRequest())
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
