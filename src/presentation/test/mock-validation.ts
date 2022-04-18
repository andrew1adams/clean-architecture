import { Validation } from '@/presentation/protocols'

class ValidationStub implements Validation {
  errorMessage: string

  validate(field: string, input: object): string {
    return this.errorMessage
  }
}

export { ValidationStub }
