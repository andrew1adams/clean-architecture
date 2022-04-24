import { AccountModel } from '@/domain/models'
import faker from 'faker'

const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

export { mockAccountModel }
