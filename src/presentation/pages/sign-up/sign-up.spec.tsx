import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import {
  testChildCount,
  testButtonIsDisabled,
  testStatusField,
  ValidationStub,
  populateField,
  testElementAlreadyExists,
  AddAccountSpy,
  testElementTextToBeCompared
} from '@/presentation/test'
import faker from 'faker'
import { EmailInUseError } from '@/domain/error'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'
import { MainContext } from '@/presentation/contexts'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/sign-up'] })

const SystemUnderTestCreator = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()

  render(
    <MainContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location='/sign-up'>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </MainContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (
  name: string = faker.name.findName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateField('name', name)
  populateField('email', email)
  populateField('password', password)
  populateField('passwordConfirmation', password)

  const submitBtn = screen.getByTestId('submit-btn')
  fireEvent.click(submitBtn)
}

describe('SignUp', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    SystemUnderTestCreator({ validationError })

    testChildCount('error-wrapper', 0)
    testButtonIsDisabled('submit-btn', true)
    testStatusField('name', validationError)
    testStatusField('email', validationError)
    testStatusField('password', validationError)
    testStatusField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    SystemUnderTestCreator({ validationError })

    populateField('name')
    testStatusField('name', validationError)
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

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    SystemUnderTestCreator({ validationError })

    populateField('passwordConfirmation')
    testStatusField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    SystemUnderTestCreator()
    populateField('name')

    testStatusField('name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    SystemUnderTestCreator()
    populateField('passwordConfirmation')

    testStatusField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    SystemUnderTestCreator()

    populateField('name')
    populateField('email')
    populateField('password')
    populateField('passwordConfirmation')
    testButtonIsDisabled('submit-btn', false)
  })

  test('Should show spinner on submit', () => {
    SystemUnderTestCreator()

    simulateValidSubmit()
    testElementAlreadyExists('spinner')
  })

  test('Should call AddAccount with correct values', () => {
    const { addAccountSpy } = SystemUnderTestCreator()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', () => {
    const { addAccountSpy } = SystemUnderTestCreator()

    simulateValidSubmit()
    simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = SystemUnderTestCreator({
      validationError
    })

    simulateValidSubmit()

    fireEvent.submit(screen.getByTestId('sign-up-form'))

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { addAccountSpy } = SystemUnderTestCreator()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    simulateValidSubmit()

    testChildCount('error-wrapper', 1)

    await waitFor(() => testElementTextToBeCompared('main-error', error.message))
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = SystemUnderTestCreator()

    simulateValidSubmit()

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenLastCalledWith(addAccountSpy.account)
    })

    expect(history.location.pathname).toBe('/')
  })

  test('Should go to login page', () => {
    SystemUnderTestCreator()

    const signUp = screen.getByTestId('login-link')
    fireEvent.click(signUp)

    expect(history.location.pathname).toBe('/login')
  })
})
