import { screen } from '@testing-library/react'

const testStatusField = (fieldName: string, validationError: string = ''): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError)
  expect(fieldStatus.className).toContain(validationError ? 'error' : 'success')
}

export { testStatusField }
