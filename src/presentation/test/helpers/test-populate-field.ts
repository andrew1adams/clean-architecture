import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

const populateField = (fieldName: string, value: any = faker.random.word()): void => {
  const element = screen.getByTestId(`${fieldName}-input`)
  fireEvent.input(element, { target: { value } })
}

export { populateField }
