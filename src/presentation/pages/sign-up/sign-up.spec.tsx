import React from 'react'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import {
  testChildCount,
  testButtonIsDisabled,
  testStatusField,
  ValidationStub,
  populateField
} from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const SystemUnderTestCreator = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const sut = render(<SignUp validation={validationStub} />)

  return {
    sut
  }
}

describe('Login', () => {
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
})
