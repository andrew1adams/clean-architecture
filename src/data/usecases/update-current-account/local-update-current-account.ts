import { SetStorage } from '@/data/protocols'
import { UnexpectedError } from '@/domain/error'
import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/usecases'

class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  private readonly setStorage: SetStorage

  constructor(setStorage: SetStorage) {
    this.setStorage = setStorage
  }

  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }

    this.setStorage.set('account', JSON.stringify(account))
  }
}

export { LocalUpdateCurrentAccount }
