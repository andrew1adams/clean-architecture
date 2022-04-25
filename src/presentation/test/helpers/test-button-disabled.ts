import { screen } from '@testing-library/react'

const testButtonIsDisabled = (testId: string, isDisabled: boolean): void => {
  const btn = screen.getByTestId(testId) as HTMLButtonElement
  expect(btn.disabled).toBe(isDisabled)
}

export { testButtonIsDisabled }
