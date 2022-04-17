import React from 'react'
import { Login } from '@/presentation/pages'
import {
  RemoteAuthenticationCreator,
  LoginValidationCreator,
  LocalSaveAccessTokenCreator
} from '@/main/factories'

const LoginComponent: React.FC = () => (
  <Login
    authentication={RemoteAuthenticationCreator()}
    validation={LoginValidationCreator()}
    saveAccessToken={LocalSaveAccessTokenCreator()}
  />
)

export { LoginComponent }
