import { SetStorage } from '@/data/protocols'

class LocalStorageAdapter implements SetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export { LocalStorageAdapter }
