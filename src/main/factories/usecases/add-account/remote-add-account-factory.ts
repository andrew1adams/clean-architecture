import { RemoteAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { AxiosHttpClientCreator, ApiURLCreator } from '@/main/factories'

const RemoteAddAccountCreator = (): AddAccount =>
  new RemoteAddAccount(ApiURLCreator('/signup'), AxiosHttpClientCreator())

export { RemoteAddAccountCreator }
