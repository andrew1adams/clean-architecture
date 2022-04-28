import axios from 'axios'

import { mockHttpResponse } from '@/infra/test'

const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse())

  return mockedAxios
}

export { mockAxios }
