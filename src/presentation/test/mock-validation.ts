import { Validation } from '@/presentation/protocols';

class ValidationStub implements Validation {
  errorMessage: string;

  validate(field: string, value: string): string {
    return this.errorMessage;
  }
}

export { ValidationStub };

