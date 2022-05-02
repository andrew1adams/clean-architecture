import faker from 'faker'

import { AddAccountParams, AddAccountModel } from '@/domain/usecases'

const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

const mockAddAccountModel = (): AddAccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

export { mockAddAccountParams, mockAddAccountModel }
