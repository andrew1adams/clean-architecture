import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

class EmailValidation implements FieldValidation {
  readonly field: string;
  constructor(field: string) {
    this.field = field;
  }

  validate(value: string): Error {
    const emailRegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailRegExp.test(value) ? null : new InvalidFieldError();
  }
}

export { EmailValidation };

