import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/protocols'
import { getCurrentAccountAdapter } from '@/main/adapters'

jest.mock('@/infra/protocols/cache/local-storage-adapter')

describe('GetCurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const localStorageAdapterSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account)
    const getReturn = getCurrentAccountAdapter()
    expect(localStorageAdapterSpy).toHaveBeenCalledWith('account')
    expect(getReturn).toEqual(account)
  })
})
