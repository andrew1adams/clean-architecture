import { SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from '@/infra/protocols'

const LocalStorageAdapterCreator = (): SetStorage => new LocalStorageAdapter()

export { LocalStorageAdapterCreator }
