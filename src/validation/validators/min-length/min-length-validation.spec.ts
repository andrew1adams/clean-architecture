import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'
import faker from 'faker'

const SystemUnderTestCreator = (minLength: number = 5): MinLengthValidation =>
  new MinLengthValidation(faker.random.word(), minLength)

describe('Min Length Validation', () => {
  test('Should return error if value is invalid', () => {
    const sut = SystemUnderTestCreator()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = SystemUnderTestCreator()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
