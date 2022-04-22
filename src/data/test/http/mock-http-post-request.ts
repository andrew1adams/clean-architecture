import { HttpPostParams } from '@/data/protocols'
import faker from 'faker'

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export { mockPostRequest }
