import { SignUpValidationCreator } from '@/main/factories'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('Sign Up Validation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = SignUpValidationCreator()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').required().min(3).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
        ...ValidationBuilder.field('passwordConfirmation').required().compare('password').build()
      ])
    )
  })
})
