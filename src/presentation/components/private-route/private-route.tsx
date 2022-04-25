import React, { ReactElement, useContext } from 'react'
import { MainContext } from '@/presentation/contexts'
import { Navigate } from 'react-router-dom'

type Props = {
  element: ReactElement<any, any>
}

const PrivateRoute: React.FC<Props> = ({ element }: Props) => {
  const { getCurrentAccount } = useContext(MainContext)

  return getCurrentAccount()?.accessToken ? element : <Navigate to='/login' replace />
}

export { PrivateRoute }
