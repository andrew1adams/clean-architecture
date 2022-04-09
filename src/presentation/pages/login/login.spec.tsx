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
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const SystemUnderTestCreator = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const authenticationSpy = new AuthenticationSpy();

  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );

  return {
    sut,
    validationStub,
    authenticationSpy,
  };
};

describe('Login', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = SystemUnderTestCreator({ validationError });

    const errorWrapper = sut.getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitBtn = sut.getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.className).toContain('error');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.className).toContain('error');
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = SystemUnderTestCreator({ validationError });

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.className).toContain('error');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = SystemUnderTestCreator({ validationError });

    const passwordInput = sut.getByTestId('password-input');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.className).toContain('error');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator();
    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Filled in Correctly');
    expect(emailStatus.className).toContain('success');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator();
    const passwordInput = sut.getByTestId('password-input');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Filled in Correctly');
    expect(passwordStatus.className).toContain('success');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = SystemUnderTestCreator();

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password-input');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitBtn = sut.getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = SystemUnderTestCreator();

    const emailInput = sut.getByTestId('email-input');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password-input');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitBtn = sut.getByTestId('submit-btn');
    fireEvent.click(submitBtn);

    const spinner = sut.getAllByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator();

    const emailInput = sut.getByTestId('email-input');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });

    const passwordInput = sut.getByTestId('password-input');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, {
      target: { value: password },
    });

    const submitBtn = sut.getByTestId('submit-btn');
    fireEvent.click(submitBtn);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});

