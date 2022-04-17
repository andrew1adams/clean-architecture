import { RenderResult } from '@testing-library/react'

const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const btn = sut.getByTestId(testId) as HTMLButtonElement
  expect(btn.disabled).toBe(isDisabled)
}

export { testButtonIsDisabled }
