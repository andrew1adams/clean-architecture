import { AccountModel } from '@/domain/models'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

const MainContext = createContext<Props>(null)

export { MainContext }
