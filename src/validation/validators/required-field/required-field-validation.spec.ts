import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/validators'
import faker from 'faker'

const SystemUnderTestCreator = (field: string = faker.random.word()): RequiredFieldValidation =>
  new RequiredFieldValidation(field)

describe('Required Field Validation', () => {
  test('Should return error if field is empty', () => {
    const sut = SystemUnderTestCreator()
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
  test('Should return error if field is not empty', () => {
    const sut = SystemUnderTestCreator()
    const error = sut.validate(faker.random.word())

    expect(error).toBeFalsy()
  })
})
