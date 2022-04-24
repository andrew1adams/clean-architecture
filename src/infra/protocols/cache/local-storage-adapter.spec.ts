import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from '@/infra/protocols'
import { AccountModel } from '@/domain/models'

const SystemUnderTestCreator = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call LocalStorage with correct values', () => {
    const key = faker.random.word()
    const value = faker.random.objectElement<AccountModel>()
    const sut = SystemUnderTestCreator()
    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
