import { LocalStorageAdapter } from '@/infra/protocols'

const LocalStorageAdapterCreator = (): LocalStorageAdapter => new LocalStorageAdapter()

export { LocalStorageAdapterCreator }
