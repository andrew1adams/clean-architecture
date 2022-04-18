import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

class MinLengthValidation implements FieldValidation {
  readonly field: string
  readonly minLength: number

  constructor(field: string, minLength: number) {
    this.field = field
    this.minLength = minLength
  }

  validate(input: object): Error {
    return input[this.field]?.length < this.minLength ? new InvalidFieldError() : null
  }
}

export { MinLengthValidation }
