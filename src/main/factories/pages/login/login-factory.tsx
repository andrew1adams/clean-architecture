import React from 'react'
import { Login } from '@/presentation/pages'
import {
  RemoteAuthenticationCreator,
  LoginValidationCreator,
  LocalUpdateCurrentAccountCreator
} from '@/main/factories'

const LoginComponent: React.FC = () => (
  <Login
    authentication={RemoteAuthenticationCreator()}
    validation={LoginValidationCreator()}
    updateCurrentAccount={LocalUpdateCurrentAccountCreator()}
  />
)

export { LoginComponent }
