import { mockGetRequest, mockPostRequest } from '@/data/test'
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
    test('Should call axios.post  with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = SystemUnderTestCreator()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response on axios.post', () => {
      const { sut, mockedAxios } = SystemUnderTestCreator()
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return correct error on axios.post', () => {
      const { sut, mockedAxios } = SystemUnderTestCreator()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
  describe('Get Method', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = SystemUnderTestCreator()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    test('Should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = SystemUnderTestCreator()
      const httpResponse = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })
  })
})
