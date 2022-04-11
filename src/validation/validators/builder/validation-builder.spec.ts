import {
  RequiredFieldValidation,
  ValidationBuilder,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import faker from 'faker';

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.random.word();
    const validations = ValidationBuilder.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.random.word();
    const validations = ValidationBuilder.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.random.word();
    const length = faker.random.number();
    const validations = ValidationBuilder.field(field).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test('Should return a list of Validations', () => {
    const field = faker.random.word();
    const length = faker.random.number();
    const validations = ValidationBuilder.field(field)
      .required()
      .min(length)
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});

