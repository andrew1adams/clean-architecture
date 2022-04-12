import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

class RequiredFieldValidation implements FieldValidation {
  readonly field: string;

  constructor (field: string) {
    this.field = field
  }

  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}

export { RequiredFieldValidation }
