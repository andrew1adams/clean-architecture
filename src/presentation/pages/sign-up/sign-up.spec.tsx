import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
}

const SystemUnderTestCreator = (): SutTypes => {
  const sut = render(<SignUp />)

  return {
    sut
  }
}

const testChildCount = (sut: RenderResult, testId: string, count: number): void => {
  const element = sut.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const btn = sut.getByTestId(testId) as HTMLButtonElement
  expect(btn.disabled).toBe(isDisabled)
}

const testStatusField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Filled in Correctly')
  expect(fieldStatus.className).toContain(validationError ? 'error' : 'success')
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
