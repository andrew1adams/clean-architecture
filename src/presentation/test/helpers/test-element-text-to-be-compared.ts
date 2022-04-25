import { screen } from '@testing-library/react'

const testElementTextToBeCompared = (testId: string, text: string): void => {
  const element = screen.getByTestId(testId)
  expect(element.textContent).toBe(text)
}

export { testElementTextToBeCompared }
