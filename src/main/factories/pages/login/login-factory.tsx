import React from 'react'

import { RemoteAuthenticationCreator, LoginValidationCreator } from '@/main/factories'
import { Login } from '@/presentation/pages'

const LoginComponent: React.FC = () => (
  <Login authentication={RemoteAuthenticationCreator()} validation={LoginValidationCreator()} />
)

export { LoginComponent }
