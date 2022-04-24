import { SetStorage } from '@/data/protocols'

class LocalStorageAdapter implements SetStorage {
  set(key: string, value: any): void {
    localStorage.setItem(key, value)
  }
}

export { LocalStorageAdapter }
