import { SetStorageMock } from '@/data/test'
import { LocalUpdateCurrentAccount } from '@/data/usecases'
import { UnexpectedError } from '@/domain/error'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const SystemUnderTestCreator = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)
  return { sut, setStorageMock }
}

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = SystemUnderTestCreator()
    const account = mockAccountModel()
    await sut.save(account)

    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = SystemUnderTestCreator()

    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.save(mockAccountModel())

    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if account is falsy', async () => {
    const { sut } = SystemUnderTestCreator()
    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
