import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '@/validation/protocols'

class ValidationComposite implements Validation {
  private readonly validators: FieldValidation[];

  private constructor (validators: FieldValidation[]) {
    this.validators = validators
  }

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (field: string, value: string): string {
    const validators = this.validators.filter(
      (validator) => validator.field === field
    )

    for (const validator of validators) {
      const error = validator.validate(value)

      if (error) return error.message
    }
  }
}

export { ValidationComposite }
