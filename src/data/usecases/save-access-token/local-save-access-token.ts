import { SetStorage } from '@/data/protocols'
import { UnexpectedError } from '@/domain/error'
import { SaveAccessToken } from '@/domain/usecases'

class LocalSaveAccessToken implements SaveAccessToken {
  private readonly setStorage: SetStorage

  constructor(setStorage: SetStorage) {
    this.setStorage = setStorage
  }

  async save(accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError()
    }

    await this.setStorage.set('accessToken', accessToken)
  }
}

export { LocalSaveAccessToken }
