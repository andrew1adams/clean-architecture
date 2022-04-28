import faker from 'faker'

import { HttpPostParams } from '@/data/protocols'

const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export { mockPostRequest }
