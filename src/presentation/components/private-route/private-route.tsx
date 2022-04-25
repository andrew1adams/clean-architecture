import { MainContext } from '@/presentation/contexts'
import React, { ReactElement, useContext } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  element: ReactElement<any, any>
}

const PrivateRoute: React.FC = ({ element }: Props) => {
  const { getCurrentAccount } = useContext(MainContext)

  return getCurrentAccount()?.accessToken ? element : <Navigate to='/login' replace />
}

export { PrivateRoute }
