import React from 'react'
import { Login } from '@/presentation/pages'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import {
  ValidationStub,
  AuthenticationSpy,
  testStatusField,
  populateField
} from '@/presentation/test'
import { MainContext } from '@/presentation/contexts'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/error'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const SystemUnderTestCreator = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const setCurrentAccountMock = jest.fn()

  render(
    <MainContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location='/login'>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </MainContext.Provider>
  )

  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateField('email', email)
  populateField('password', password)

  const submitBtn = screen.getByTestId('submit-btn')
  fireEvent.click(submitBtn)
}

describe('Login', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    SystemUnderTestCreator({ validationError })

    expect(screen.getByTestId('error-wrapper').children).toHaveLength(0)
    expect(screen.getByTestId('submit-btn')).toBeDisabled()
    testStatusField('email', validationError)
    testStatusField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    SystemUnderTestCreator({ validationError })

    populateField('email')
    testStatusField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    SystemUnderTestCreator({ validationError })

    populateField('password')

    testStatusField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    SystemUnderTestCreator()
    populateField('email')

    testStatusField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    SystemUnderTestCreator()
    populateField('password')

    testStatusField('password')
  })

  test('Should enable submit button if form is valid', () => {
    SystemUnderTestCreator()

    populateField('email')
    populateField('password')
    expect(screen.getByTestId('submit-btn')).toBeEnabled()
  })

  test('Should show spinner on submit', () => {
    SystemUnderTestCreator()

    simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call Authentication with correct values', () => {
    const { authenticationSpy } = SystemUnderTestCreator()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { authenticationSpy } = SystemUnderTestCreator()

    simulateValidSubmit()
    simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = SystemUnderTestCreator({
      validationError
    })

    populateField('email')

    fireEvent.submit(screen.getByTestId('login-form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = SystemUnderTestCreator()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    simulateValidSubmit()

    expect(screen.getByTestId('error-wrapper').children).toHaveLength(1)

    await waitFor(() => expect(screen.getByTestId('main-error')).toHaveTextContent(error.message))
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = SystemUnderTestCreator()

    simulateValidSubmit()

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    })

    expect(history.location.pathname).toBe('/')
  })

  test('Should go to sign up page', () => {
    SystemUnderTestCreator()

    const signUp = screen.getByTestId('sign-up-link')
    fireEvent.click(signUp)

    expect(history.location.pathname).toBe('/sign-up')
  })
})
