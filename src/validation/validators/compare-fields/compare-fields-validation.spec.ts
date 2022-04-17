import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'
import faker from 'faker'

const SystemUnderTestCreator = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.random.word(), valueToCompare)

describe('Compare Fields Validation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = SystemUnderTestCreator(faker.random.word())
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return error if compare is valid', () => {
    const value = faker.random.word()
    const sut = SystemUnderTestCreator(value)
    const error = sut.validate(value)

    expect(error).toBeFalsy()
  })
})
