import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from '@/validation/validators';
import faker from 'faker';

describe('Min Length Validation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5);
    const error = sut.validate('123');
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const sut = new MinLengthValidation('field', 5);
    const error = sut.validate('123456');
    expect(error).toBeFalsy();
  });
});

