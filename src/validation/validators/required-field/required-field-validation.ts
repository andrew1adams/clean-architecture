import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

class RequiredFieldValidation implements FieldValidation {
  readonly field: string

  constructor(field: string) {
    this.field = field
  }

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}

export { RequiredFieldValidation }
