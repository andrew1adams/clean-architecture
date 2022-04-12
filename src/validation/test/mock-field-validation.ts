import { FieldValidation } from '@/validation/protocols'

class FieldValidationSpy implements FieldValidation {
  readonly field: string;
  error: Error = null;

  constructor (field: string) {
    this.field = field
  }

  validate (value: string): Error {
    return this.error
  }
}

export { FieldValidationSpy }
