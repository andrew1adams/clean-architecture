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
import { AuthenticationSpy } from '@/presentation/test';

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

const simulateValidSubmit = (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitBtn = sut.getByTestId('submit-btn');
  fireEvent.click(submitBtn);
};

const populateEmailField = (
  sut: RenderResult,
  email: string = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email-input');
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  sut: RenderResult,
  password: string = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password-input');
  fireEvent.input(passwordInput, { target: { value: password } });
};

const testStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const inputStatus = sut.getByTestId(`${fieldName}-status`);
  expect(inputStatus.title).toBe(validationError || 'Filled in Correctly');
  expect(inputStatus.className).toContain(
    validationError ? 'error' : 'success'
  );
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

    testStatusField(sut, 'email', validationError);
    testStatusField(sut, 'password', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = SystemUnderTestCreator({ validationError });

    populateEmailField(sut);
    testStatusField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = SystemUnderTestCreator({ validationError });

    populatePasswordField(sut);

    testStatusField(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator();
    populateEmailField(sut);

    testStatusField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = SystemUnderTestCreator();
    populatePasswordField(sut);

    testStatusField(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = SystemUnderTestCreator();

    populateEmailField(sut);
    populatePasswordField(sut);

    const submitBtn = sut.getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = SystemUnderTestCreator();

    simulateValidSubmit(sut);

    const spinner = sut.getAllByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = SystemUnderTestCreator();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });
});

