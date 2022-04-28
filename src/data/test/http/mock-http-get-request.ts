import faker from 'faker'

import { HttpGetParams } from '@/data/protocols'

const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})

export { mockGetRequest }
