import React from 'react'

import { SignUpValidationCreator, RemoteAddAccountCreator } from '@/main/factories'
import { SignUp } from '@/presentation/pages'

const SignUpComponent: React.FC = () => (
  <SignUp addAccount={RemoteAddAccountCreator()} validation={SignUpValidationCreator()} />
)

export { SignUpComponent }
