import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

class EmailValidation implements FieldValidation {
  readonly field: string
  constructor(field: string) {
    this.field = field
  }

  validate(input: object): Error {
    const emailRegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return !input[this.field] || emailRegExp.test(input[this.field])
      ? null
      : new InvalidFieldError()
  }
}

export { EmailValidation }
