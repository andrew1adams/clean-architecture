import { SetStorageSpy } from '@/data/test'
import { LocalSaveAccessToken } from '@/data/usecases'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const SystemUnderTestCreator = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return { sut, setStorageSpy }
}

describe('Local Save Access Token', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = SystemUnderTestCreator()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
