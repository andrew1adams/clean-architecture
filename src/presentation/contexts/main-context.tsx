import { AccountModel } from '@/domain/models'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
}

const MainContext = createContext<Props>(null)

export { MainContext }
