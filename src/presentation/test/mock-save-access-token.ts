import { SaveAccessToken } from '@/domain/usecases'

class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string

  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}

export { SaveAccessTokenMock }
