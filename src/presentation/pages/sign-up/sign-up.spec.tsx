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
    const fixedValue = 'Filled in Correctly'
    const { sut } = SystemUnderTestCreator({ validationError })

    testChildCount(sut, 'error-wrapper', 0)
    testButtonIsDisabled(sut, 'submit-btn', true)
    testStatusField(sut, 'name', validationError)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', fixedValue)
    testStatusField(sut, 'passwordConfirmation', fixedValue)
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
})
