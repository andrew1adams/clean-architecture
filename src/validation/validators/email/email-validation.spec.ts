import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const SystemUnderTestCreator = (): EmailValidation => new EmailValidation(faker.random.word())

describe('Email Validation', () => {
  test('Should return error if email is invalid', () => {
    const sut = SystemUnderTestCreator()
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return error if email is valid', () => {
    const sut = SystemUnderTestCreator()
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const sut = SystemUnderTestCreator()
    const error = sut.validate('')

    expect(error).toBeFalsy()
  })
})
