import React from 'react'
import { Login } from '@/presentation/pages'
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/error'
import 'jest-localstorage-mock'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const SystemUnderTestCreator = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const sut = render(
    <Router navigator={history} location="/login">
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )

  return {
    sut,
    validationStub,
    authenticationSpy
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const submitBtn = sut.getByTestId('submit-btn')
  fireEvent.click(submitBtn)
}

const populateEmailField = (
  sut: RenderResult,
  email: string = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email-input')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (
  sut: RenderResult,
  password: string = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password-input')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const inputStatus = sut.getByTestId(`${fieldName}-status`)
  expect(inputStatus.title).toBe(validationError || 'Filled in Correctly')
  expect(inputStatus.className).toContain(
    validationError ? 'error' : 'success'
  )
}

const testErrorWrapperChildCount = (sut: RenderResult, count: number): void => {
  const errorWrapper = sut.getByTestId('error-wrapper')
  expect(errorWrapper.childElementCount).toBe(count)
}

const testElementAlreadyExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toBeTruthy()
}

const testElementTextToBeCompared = (
  sut: RenderResult,
  testId: string,
  text: string
): void => {
  const element = sut.getByTestId(testId)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  testId: string,
  isDisabled: boolean
): void => {
  const btn = sut.getByTestId(testId) as HTMLButtonElement
  expect(btn.disabled).toBe(isDisabled)
}

describe('Login', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    testErrorWrapperChildCount(sut, 0)
    testButtonIsDisabled(sut, 'submit-btn', true)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    populateEmailField(sut)
    testStatusField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    populatePasswordField(sut)

    testStatusField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator()
    populateEmailField(sut)

    testStatusField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator()
    populatePasswordField(sut)

    testStatusField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = SystemUnderTestCreator()

    populateEmailField(sut)
    populatePasswordField(sut)
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

    populateEmailField(sut)

    fireEvent.submit(sut.getByTestId('login-form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)

    testErrorWrapperChildCount(sut, 1)

    await waitFor(() =>
      testElementTextToBeCompared(sut, 'main-error', error.message)
    )
  })

  test('Should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator()

    simulateValidSubmit(sut)

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'accessToken',
        authenticationSpy.account.accessToken
      )
    })

    expect(history.location.pathname).toBe('/')
  })

  test('Should go to sign up page', () => {
    const { sut } = SystemUnderTestCreator()

    const signUp = sut.getByTestId('sign-up-route')
    fireEvent.click(signUp)

    expect(history.location.pathname).toBe('/sign-up')
  })
})
