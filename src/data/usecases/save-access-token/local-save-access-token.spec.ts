import { SetStorageSpy } from '@/data/test'
import { LocalSaveAccessToken } from '@/data/usecases'
import faker from 'faker'

describe('Local Save Access Token', () => {
  test('Should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
