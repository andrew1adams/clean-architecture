import {
  RequiredFieldValidation,
  ValidationBuilder,
  EmailValidation,
} from '@/validation/validators';

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build();

    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });

  test('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build();

    expect(validations).toEqual([new EmailValidation('any_field')]);
  });
});

