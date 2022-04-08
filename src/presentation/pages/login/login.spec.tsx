import React from 'react';
import { Login } from '@/presentation/pages';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { ValidationSpy } from '@/presentation/test';
import faker from 'faker';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const SystemUnderTestCreator = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.random.words();

  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy,
  };
};

describe('Login', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut, validationSpy } = SystemUnderTestCreator();

    const errorWrapper = sut.getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitBtn = sut.getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.className).toContain('error');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Required Field');
    expect(passwordStatus.className).toContain('error');
  });

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = SystemUnderTestCreator();
    const email = faker.internet.email();

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.field).toEqual('email');
    expect(validationSpy.value).toEqual(email);
  });

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = SystemUnderTestCreator();
    const password = faker.internet.password();

    const passWordInput = sut.getByTestId('password-input');
    fireEvent.input(passWordInput, { target: { value: password } });
    expect(validationSpy.field).toEqual('password');
    expect(validationSpy.value).toEqual(password);
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationSpy } = SystemUnderTestCreator();

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.className).toContain('error');
  });
});

