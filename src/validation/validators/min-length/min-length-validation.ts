import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

class MinLengthValidation implements FieldValidation {
  readonly field: string;
  readonly minLength: number;

  constructor (field: string, minLength: number) {
    this.field = field
    this.minLength = minLength
  }

  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}

export { MinLengthValidation }
