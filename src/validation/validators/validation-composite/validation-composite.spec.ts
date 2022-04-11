import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from '@/validation/validators';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const SystemUnderTestCreator = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];

  const sut = new ValidationComposite(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = SystemUnderTestCreator();

    fieldValidationsSpy.forEach(
      (fieldValidation, idx) =>
        (fieldValidation.error = new Error(`error_message_${idx}`))
    );

    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe('error_message_0');
  });
});

