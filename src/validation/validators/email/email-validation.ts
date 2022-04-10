import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

class EmailValidation implements FieldValidation {
  readonly field: string;
  constructor(field: string) {
    this.field = field;
  }

  validate(value: string): Error {
    return new InvalidFieldError();
  }
}

export { EmailValidation };

