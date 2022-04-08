import React from 'react';
import { Login } from '@/presentation/pages';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { ValidationSpy } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

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

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = SystemUnderTestCreator();

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.field).toEqual('email');
    expect(validationSpy.value).toEqual('any_email');
  });
  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = SystemUnderTestCreator();

    const passWordInput = sut.getByTestId('password-input');
    fireEvent.input(passWordInput, { target: { value: 'any_password' } });
    expect(validationSpy.field).toEqual('password');
    expect(validationSpy.value).toEqual('any_password');
  });
});

