import { EmailValidation } from '@/validation/validators';
import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';

describe('Email Validation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word());
    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return error if email is valid', () => {
    const sut = new EmailValidation(faker.random.word());
    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});

