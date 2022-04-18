import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const SystemUnderTestCreator = (field: string): EmailValidation => new EmailValidation(field)

describe('Email Validation', () => {
  test('Should return error if email is invalid', () => {
    const field = faker.random.word()
    const sut = SystemUnderTestCreator(field)
    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return error if email is valid', () => {
    const field = faker.random.word()
    const sut = SystemUnderTestCreator(field)
    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const field = faker.random.word()
    const sut = SystemUnderTestCreator(field)
    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
