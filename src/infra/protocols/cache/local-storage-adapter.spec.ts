import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from '@/infra/protocols'

describe('Local Storage Adapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call LocalStorage with correct values', async () => {
    const key = faker.random.word()
    const value = faker.random.word()
    const sut = new LocalStorageAdapter()
    await sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
