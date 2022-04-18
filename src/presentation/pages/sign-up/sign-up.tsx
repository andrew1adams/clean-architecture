import { AddAccount } from '@/domain/usecases'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import { LoginFormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'
import React, { useEffect, useState } from 'react'
import styles from './sign-up.module.scss'

const { signUp, form, submit, link } = styles

type SignInProps = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<SignInProps> = ({ validation, addAccount }: SignInProps) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: 'Filled in Correctly',
    passwordError: 'Filled in Correctly',
    passwordConfirmationError: 'Filled in Correctly',
    errorMessage: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      )
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (
      state.isLoading ||
      state.nameError ||
      state.emailError ||
      state.passwordError ||
      state.passwordConfirmationError
    )
      return

    setState({
      ...state,
      isLoading: true
    })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  return (
    <div className={signUp}>
      <LoginHeader />
      <LoginFormContext.Provider value={{ state, setState }}>
        <form data-testid='sign-up-form' className={form} onSubmit={handleSubmit}>
          <h2>Register</h2>
          <Input name='name' type='text' placeholder='Insert your name' />
          <Input name='email' type='email' placeholder='Insert your email' />
          <Input type='password' name='password' placeholder='Insert your password' />
          <Input
            type='password'
            name='passwordConfirmation'
            placeholder='Insert your password again'
          />

          <button
            className={submit}
            data-testid='submit-btn'
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
            type='submit'
          >
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
