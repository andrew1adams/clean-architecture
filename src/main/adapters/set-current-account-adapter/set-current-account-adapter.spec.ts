import { UnexpectedError } from '@/domain/error'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/protocols'
import { setCurrentAccountAdapter } from '@/main/adapters'

jest.mock('@/infra/protocols/cache/local-storage-adapter')

describe('SetCurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const localStorageAdapterSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(localStorageAdapterSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should throws UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })
})
