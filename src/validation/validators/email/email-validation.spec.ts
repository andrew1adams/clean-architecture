import { EmailValidation } from '@/validation/validators';
import { InvalidFieldError } from '@/validation/errors';

describe('Email Validation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email');
    const error = sut.validate('');

    expect(error).toEqual(new InvalidFieldError());
  });
});

