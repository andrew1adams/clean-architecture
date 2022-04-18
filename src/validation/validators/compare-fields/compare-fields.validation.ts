import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

class CompareFieldsValidation implements FieldValidation {
  readonly field: string
  private readonly fieldToCompare: string

  constructor(field: string, fieldToCompare: string) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate(input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] && new InvalidFieldError()
  }
}

export { CompareFieldsValidation }
