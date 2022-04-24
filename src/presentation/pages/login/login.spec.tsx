import React from 'react'
import { Login } from '@/presentation/pages'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'
import {
  ValidationStub,
  AuthenticationSpy,
  UpdateCurrentAccountMock,
  testChildCount,
  testButtonIsDisabled,
  testStatusField,
  populateField,
  testElementAlreadyExists,
  testElementTextToBeCompared
} from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/error'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  updateCurrentAccount: UpdateCurrentAccountMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const SystemUnderTestCreator = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const updateCurrentAccount = new UpdateCurrentAccountMock()

  const sut = render(
    <Router navigator={history} location='/login'>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccount}
      />
    </Router>
  )

  return {
    sut,
    validationStub,
    authenticationSpy,
    updateCurrentAccount
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)

  const submitBtn = sut.getByTestId('submit-btn')
  fireEvent.click(submitBtn)
}

describe('Login', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    testChildCount(sut, 'error-wrapper', 0)
    testButtonIsDisabled(sut, 'submit-btn', true)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    populateField(sut, 'email')
    testStatusField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    populateField(sut, 'password')

    testStatusField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator()
    populateField(sut, 'email')

    testStatusField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator()
    populateField(sut, 'password')

    testStatusField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = SystemUnderTestCreator()

    populateField(sut, 'email')
    populateField(sut, 'password')
    testButtonIsDisabled(sut, 'submit-btn', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = SystemUnderTestCreator()

    simulateValidSubmit(sut)
    testElementAlreadyExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = SystemUnderTestCreator({
      validationError
    })

    populateField(sut, 'email')

    fireEvent.submit(sut.getByTestId('login-form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    simulateValidSubmit(sut)

    testChildCount(sut, 'error-wrapper', 1)

    await waitFor(() => testElementTextToBeCompared(sut, 'main-error', error.message))
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { sut, authenticationSpy, updateCurrentAccount } = SystemUnderTestCreator()

    simulateValidSubmit(sut)

    await waitFor(() => {
      expect(updateCurrentAccount.account).toEqual(authenticationSpy.account)
    })

    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if UpdateCurrentAccount fails', async () => {
    const { sut, updateCurrentAccount } = SystemUnderTestCreator()
    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccount, 'save').mockRejectedValueOnce(error)
    simulateValidSubmit(sut)

    testChildCount(sut, 'error-wrapper', 1)

    await waitFor(() => testElementTextToBeCompared(sut, 'main-error', error.message))
  })

  test('Should go to sign up page', () => {
    const { sut } = SystemUnderTestCreator()

    const signUp = sut.getByTestId('sign-up-link')
    fireEvent.click(signUp)

    expect(history.location.pathname).toBe('/sign-up')
  })
})
