import { AccountModel } from '@/domain/models'

interface UpdateCurrentAccount {
  save: (account: AccountModel) => Promise<void>
}

export { UpdateCurrentAccount }
