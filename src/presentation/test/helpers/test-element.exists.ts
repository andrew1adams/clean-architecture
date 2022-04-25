import { screen } from '@testing-library/react'

const testElementAlreadyExists = (testId: string): void => {
  const element = screen.getByTestId(testId)
  expect(element).toBeTruthy()
}

export { testElementAlreadyExists }
