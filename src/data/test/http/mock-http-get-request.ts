import { HttpGetParams } from '@/data/protocols'
import faker from 'faker'

const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})

export { mockGetRequest }
