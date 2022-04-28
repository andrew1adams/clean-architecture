import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const SystemUnderTestCreator = (field: string, fieldToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const sut = SystemUnderTestCreator(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.words(2),
      [fieldToCompare]: faker.random.words(3)
    })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return error if compare is valid', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const value = faker.random.word()
    const sut = SystemUnderTestCreator(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
