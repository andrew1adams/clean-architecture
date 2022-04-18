import { RenderResult } from '@testing-library/react'

const testElementTextToBeCompared = (sut: RenderResult, testId: string, text: string): void => {
  const element = sut.getByTestId(testId)
  expect(element.textContent).toBe(text)
}

export { testElementTextToBeCompared }
