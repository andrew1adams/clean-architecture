import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import { LoginFormContext } from '@/presentation/contexts'
import React, { useState } from 'react'
import styles from './sign-up.module.scss'

const { signUp, form, submit, link } = styles

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Filled in Correctly',
    emailError: 'Filled in Correctly',
    passwordError: 'Filled in Correctly',
    passwordConfirmationError: 'Filled in Correctly',
    errorMessage: ''
  })

  return (
    <div className={signUp}>
      <LoginHeader />
      <LoginFormContext.Provider value={{ state }}>
        <form className={form}>
          <h2>Register</h2>
          <Input name='name' type='text' placeholder='Insert your name' />
          <Input name='email' type='email' placeholder='Insert your email' />
          <Input type='password' name='password' placeholder='Insert your password' />
          <Input
            type='password'
            name='passwordConfirmation'
            placeholder='Insert your password again'
          />

          <button className={submit} data-testid='submit-btn' disabled type='submit'>
            Sign In
          </button>
          <span className={link}>sign in</span>
          <FormStatus />
        </form>
      </LoginFormContext.Provider>
      <Footer />
    </div>
  )
}

export { SignUp }
