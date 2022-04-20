import { RenderResult } from '@testing-library/react'

const testStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string = ''
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError)
  expect(fieldStatus.className).toContain(validationError ? 'error' : 'success')
}

export { testStatusField }
