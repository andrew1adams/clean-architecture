import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

const MainContext = createContext<Props>(null)

export { MainContext }
