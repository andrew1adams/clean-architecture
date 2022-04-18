import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/validators'
import faker from 'faker'

const SystemUnderTestCreator = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field)

describe('Required Field Validation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.random.word()
    const sut = SystemUnderTestCreator(field)
    const error = sut.validate({ [field]: '' })

    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return error if field is not empty', () => {
    const field = faker.random.word()
    const sut = SystemUnderTestCreator(field)
    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toBeFalsy()
  })
})
