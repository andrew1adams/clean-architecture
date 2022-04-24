import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'
import faker from 'faker'

const SystemUnderTestCreator = (field: string, minLength: number = 5): MinLengthValidation =>
  new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.random.word()
    const sut = SystemUnderTestCreator(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.random.word()
    const sut = SystemUnderTestCreator(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = SystemUnderTestCreator(faker.random.word())
    const error = sut.validate({ [faker.random.word()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
