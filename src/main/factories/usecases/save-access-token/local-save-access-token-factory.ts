import { LocalSaveAccessToken } from '@/data/usecases'
import { SaveAccessToken } from '@/domain/usecases'
import { LocalStorageAdapterCreator } from '@/main/factories'

export const LocalSaveAccessTokenCreator = (): SaveAccessToken =>
  new LocalSaveAccessToken(LocalStorageAdapterCreator())
