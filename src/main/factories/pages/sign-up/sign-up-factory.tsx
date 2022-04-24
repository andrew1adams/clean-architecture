import React from 'react'
import { SignUp } from '@/presentation/pages'
import {
  SignUpValidationCreator,
  LocalUpdateCurrentAccountCreator,
  RemoteAddAccountCreator
} from '@/main/factories'

const SignUpComponent: React.FC = () => (
  <SignUp
    addAccount={RemoteAddAccountCreator()}
    validation={SignUpValidationCreator()}
    updateCurrentAccount={LocalUpdateCurrentAccountCreator()}
  />
)

export { SignUpComponent }
