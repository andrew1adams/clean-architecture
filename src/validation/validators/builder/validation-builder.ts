import { FieldValidation } from '@/validation/protocols';
import {
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators';

class ValidationBuilder {
  private readonly field: string;
  private readonly validations: FieldValidation[];

  private constructor(field: string, validations: FieldValidation[]) {
    this.field = field;
    this.validations = validations;
  }

  static field(field: string): ValidationBuilder {
    return new ValidationBuilder(field, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.field));

    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.field));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}

export { ValidationBuilder };

