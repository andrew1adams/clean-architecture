import { SetStorageMock } from '@/data/test'
import { LocalSaveAccessToken } from '@/data/usecases'
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
})
