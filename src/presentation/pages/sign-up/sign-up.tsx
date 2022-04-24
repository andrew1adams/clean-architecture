import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Footer, Input, LoginHeader, FormStatus, SubmitButton } from '@/presentation/components'
import { LoginFormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './sign-up.module.scss'

const { signUpWrapper, form, link } = styles

type SignInProps = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<SignInProps> = ({
  validation,
  addAccount,
  saveAccessToken
}: SignInProps) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        errorMessage: err.message
      })
    }
  }

  return (
    <div className={signUpWrapper}>
      <LoginHeader />
      <LoginFormContext.Provider value={{ state, setState }}>
        <form data-testid='sign-up-form' className={form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input name='name' type='text' placeholder='Digite seu nome' />
          <Input name='email' type='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input
            type='password'
            name='passwordConfirmation'
            placeholder='Insert your password again'
          />
          <SubmitButton text='Cadastrar' />

          <Link data-testid='login-link' to='/login' className={link}>
            Voltar Para Login
          </Link>
          <FormStatus />
        </form>
      </LoginFormContext.Provider>
      <Footer />
    </div>
  )
}

export { SignUp }
