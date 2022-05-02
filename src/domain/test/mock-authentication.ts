import faker from 'faker'

import { AuthenticationModel, AuthenticationParams } from '@/domain/usecases'

const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

const mockAuthenticationModel = (): AuthenticationModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

export { mockAuthenticationParams, mockAuthenticationModel }
