import {
  RequiredFieldValidation,
  ValidationBuilder,
} from '@/validation/validators';

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build();

    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });
});

