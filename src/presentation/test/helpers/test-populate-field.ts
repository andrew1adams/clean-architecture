import { fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

const populateField = (
  sut: RenderResult,
  fieldName: string,
  value: any = faker.random.word()
): void => {
  const element = sut.getByTestId(`${fieldName}-input`)
  fireEvent.input(element, { target: { value } })
}

export { populateField }
