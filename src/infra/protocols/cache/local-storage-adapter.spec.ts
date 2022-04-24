import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from '@/infra/protocols'
import { AccountModel } from '@/domain/models'

const SystemUnderTestCreator = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call LocalStorage.set with correct values', () => {
    const key = faker.random.word()
    const value = faker.random.objectElement<AccountModel>()
    const sut = SystemUnderTestCreator()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call LocalStorage.get with correct value', () => {
    const key = faker.random.word()
    const sut = SystemUnderTestCreator()
    const value = faker.random.objectElement<AccountModel>()
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(value))
    const object = sut.get(key)

    expect(getItemSpy).toHaveBeenCalledWith(key)
    expect(object).toEqual(value)
  })
})
