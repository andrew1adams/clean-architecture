import { LoginValidationCreator } from '@/main/factories'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = LoginValidationCreator()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})
