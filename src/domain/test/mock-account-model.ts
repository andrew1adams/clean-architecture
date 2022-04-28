import faker from 'faker'

import { AccountModel } from '@/domain/models'

const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

export { mockAccountModel }
