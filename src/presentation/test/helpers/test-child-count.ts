import { screen } from '@testing-library/react'

const testChildCount = (testId: string, count: number): void => {
  const element = screen.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

export { testChildCount }
