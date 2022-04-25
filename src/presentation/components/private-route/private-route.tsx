import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  element: ReactElement<any, any>
}

const PrivateRoute: React.FC = ({ element }: Props) => {
  return <Navigate to='/login' replace />
}

export { PrivateRoute }
