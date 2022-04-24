import { AccountModel } from '@/domain/models'
import { LocalStorageAdapterCreator } from '@/main/factories'

const getCurrentAccountAdapter = (): AccountModel => {
  return LocalStorageAdapterCreator().get('account')
}

export { getCurrentAccountAdapter }
