import { UnexpectedError } from '@/domain/error'
import { AccountModel } from '@/domain/models'
import { LocalStorageAdapterCreator } from '@/main/factories'

const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }

  LocalStorageAdapterCreator().set('account', account)
}

export { setCurrentAccountAdapter }
