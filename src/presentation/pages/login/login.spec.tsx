import React from 'react';
import { Login } from '@/presentation/pages';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { ValidationStub } from '@/presentation/test';
import faker from 'faker';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const SystemUnderTestCreator = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();

  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
    validationStub,
  };
};

describe('Login', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut, validationStub } = SystemUnderTestCreator();

    const errorWrapper = sut.getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitBtn = sut.getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.className).toContain('error');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.className).toContain('error');
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = SystemUnderTestCreator();

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.className).toContain('error');
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = SystemUnderTestCreator();

    const passwordInput = sut.getByTestId('password-input');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.className).toContain('error');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = SystemUnderTestCreator();
    validationStub.errorMessage = null;
    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Filled in Correctly');
    expect(emailStatus.className).toContain('success');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = SystemUnderTestCreator();
    validationStub.errorMessage = null;
    const passwordInput = sut.getByTestId('password-input');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Filled in Correctly');
    expect(passwordStatus.className).toContain('success');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut, validationStub } = SystemUnderTestCreator();
    validationStub.errorMessage = null;

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password-input');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitBtn = sut.getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);
  });
});

