import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { testChildCount, testButtonIsDisabled, testStatusField } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

const SystemUnderTestCreator = (): SutTypes => {
  const sut = render(<SignUp />)

  return {
    sut
  }
}

describe('Login', () => {
  test('Should start with initial state', () => {
    const validationError = 'Filled in Correctly'
    const { sut } = SystemUnderTestCreator()

    testChildCount(sut, 'error-wrapper', 0)
    testButtonIsDisabled(sut, 'submit-btn', true)
    testStatusField(sut, 'name', validationError)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', validationError)
    testStatusField(sut, 'passwordConfirmation', validationError)
  })
})
