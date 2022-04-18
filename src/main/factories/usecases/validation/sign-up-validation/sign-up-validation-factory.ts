import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

const SignUpValidationCreator = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('name').required().min(3).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().min(5).build()
  ])

export { SignUpValidationCreator }
