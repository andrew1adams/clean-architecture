import { RenderResult } from '@testing-library/react'

const testElementAlreadyExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toBeTruthy()
}

export { testElementAlreadyExists }
