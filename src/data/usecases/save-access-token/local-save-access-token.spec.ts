import { SetStorageMock } from '@/data/test'
import { LocalSaveAccessToken } from '@/data/usecases'
import { UnexpectedError } from '@/domain/error'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const SystemUnderTestCreator = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return { sut, setStorageMock }
}

describe('Local Save Access Token', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = SystemUnderTestCreator()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = SystemUnderTestCreator()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(faker.datatype.uuid())

    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = SystemUnderTestCreator()
    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
