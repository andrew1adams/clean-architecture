import faker from 'faker'

import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

const SystemUnderTestCreator = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
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
