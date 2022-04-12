import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from '@/validation/validators'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const SystemUnderTestCreator = (field: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const field = faker.random.word()
    const { sut, fieldValidationsSpy } = SystemUnderTestCreator(field)

    const errors = [faker.random.words(), faker.random.words()]

    fieldValidationsSpy.forEach(
      (fieldValidation, idx) => (fieldValidation.error = new Error(errors[idx]))
    )

    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(errors[0])
  })

  test('Should return falsy if all validations pass', () => {
    const field = faker.random.word()
    const { sut } = SystemUnderTestCreator(field)

    const error = sut.validate(field, faker.random.word())
    expect(error).toBeFalsy()
  })
})
