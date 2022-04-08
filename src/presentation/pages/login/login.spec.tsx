import React from 'react';
import { Login } from '@/presentation/pages';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { Validation } from '@/presentation/protocols';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

const SystemUnderTestCreator = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
};

describe('Login', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut } = SystemUnderTestCreator();

    const errorWrapper = sut.getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitBtn = sut.getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Required Field');
    expect(emailStatus.className).toContain('error');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Required Field');
    expect(passwordStatus.className).toContain('error');
  });

  test('Should call Validation with correct values', () => {
    const { sut, validationSpy } = SystemUnderTestCreator();

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.input).toEqual({ email: 'any_email' });
  });
});

