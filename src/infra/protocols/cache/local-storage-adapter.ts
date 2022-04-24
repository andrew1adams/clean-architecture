import { GetStorage, SetStorage } from '@/data/protocols'

class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}

export { LocalStorageAdapter }
