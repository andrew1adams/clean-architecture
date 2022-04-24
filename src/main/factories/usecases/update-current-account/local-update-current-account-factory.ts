import { LocalUpdateCurrentAccount } from '@/data/usecases'
import { UpdateCurrentAccount } from '@/domain/usecases'
import { LocalStorageAdapterCreator } from '@/main/factories'

export const LocalUpdateCurrentAccountCreator = (): UpdateCurrentAccount =>
  new LocalUpdateCurrentAccount(LocalStorageAdapterCreator())
