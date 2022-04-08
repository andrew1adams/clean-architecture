import { Validation } from '@/presentation/protocols';

class ValidationSpy implements Validation {
  errorMessage: string;
  field: string;
  value: string;

  validate(field: string, value: string): string {
    this.field = field;
    this.value = value;
    return this.errorMessage;
  }
}

export { ValidationSpy };

