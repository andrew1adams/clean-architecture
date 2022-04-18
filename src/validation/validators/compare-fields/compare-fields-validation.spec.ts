import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'
import faker from 'faker'

const SystemUnderTestCreator = (field: string, fieldToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare)

describe('Compare Fields Validation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const sut = SystemUnderTestCreator(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
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
