import faker from 'faker'

import { AuthenticationParams } from '@/domain/usecases'

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export { mockAuthentication }
