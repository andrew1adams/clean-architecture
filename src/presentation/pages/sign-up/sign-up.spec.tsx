import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import {
  testChildCount,
  testButtonIsDisabled,
  testStatusField,
  ValidationStub,
  populateField,
  testElementAlreadyExists,
  AddAccountSpy,
  testElementTextToBeCompared,
  UpdateCurrentAccountMock
} from '@/presentation/test'
import faker from 'faker'
import { EmailInUseError } from '@/domain/error'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  updateCurrentAccount: UpdateCurrentAccountMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/sign-up'] })

const SystemUnderTestCreator = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const updateCurrentAccount = new UpdateCurrentAccountMock()

  const sut = render(
    <Router navigator={history} location='/sign-up'>
      <SignUp
        validation={validationStub}
        addAccount={addAccountSpy}
        updateCurrentAccount={updateCurrentAccount}
      />
    </Router>
  )

  return {
    sut,
    addAccountSpy,
    updateCurrentAccount
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  name: string = faker.name.findName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateField(sut, 'name', name)
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)
  populateField(sut, 'passwordConfirmation', password)

  const submitBtn = sut.getByTestId('submit-btn')
  fireEvent.click(submitBtn)
}

describe('SignUp', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    testChildCount(sut, 'error-wrapper', 0)
    testButtonIsDisabled(sut, 'submit-btn', true)
    testStatusField(sut, 'name', validationError)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', validationError)
    testStatusField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    populateField(sut, 'name')
    testStatusField(sut, 'name', validationError)
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

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = SystemUnderTestCreator({ validationError })

    populateField(sut, 'passwordConfirmation')
    testStatusField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator()
    populateField(sut, 'name')

    testStatusField(sut, 'name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator()
    populateField(sut, 'passwordConfirmation')

    testStatusField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = SystemUnderTestCreator()

    populateField(sut, 'name')
    populateField(sut, 'email')
    populateField(sut, 'password')
    populateField(sut, 'passwordConfirmation')
    testButtonIsDisabled(sut, 'submit-btn', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = SystemUnderTestCreator()

    simulateValidSubmit(sut)
    testElementAlreadyExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountSpy } = SystemUnderTestCreator()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', () => {
    const { sut, addAccountSpy } = SystemUnderTestCreator()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = SystemUnderTestCreator({
      validationError
    })

    simulateValidSubmit(sut)

    fireEvent.submit(sut.getByTestId('sign-up-form'))

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, addAccountSpy } = SystemUnderTestCreator()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    simulateValidSubmit(sut)

    testChildCount(sut, 'error-wrapper', 1)

    await waitFor(() => testElementTextToBeCompared(sut, 'main-error', error.message))
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { sut, addAccountSpy, updateCurrentAccount } = SystemUnderTestCreator()

    simulateValidSubmit(sut)

    await waitFor(() => {
      expect(updateCurrentAccount.account).toEqual(addAccountSpy.account)
    })

    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if UpdateCurrentAccount fails', async () => {
    const { sut, updateCurrentAccount } = SystemUnderTestCreator()
    const error = new EmailInUseError()
    jest.spyOn(updateCurrentAccount, 'save').mockRejectedValueOnce(error)
    simulateValidSubmit(sut)

    testChildCount(sut, 'error-wrapper', 1)

    await waitFor(() => testElementTextToBeCompared(sut, 'main-error', error.message))
  })

  test('Should go to login page', () => {
    const { sut } = SystemUnderTestCreator()

    const signUp = sut.getByTestId('login-link')
    fireEvent.click(signUp)

    expect(history.location.pathname).toBe('/login')
  })
})
