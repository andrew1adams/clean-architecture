import { HttpPostClientSpy } from '@/data/test'
import { RemoteAddAccount } from '@/data/usecases'
import { AccountModel } from '@/domain/models'
import { mockAddAccount } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const SystemUnderTestCreator = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('Remote Add Account', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = SystemUnderTestCreator(url)
    await sut.add(mockAddAccount())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
