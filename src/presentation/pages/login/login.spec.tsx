import React from 'react';
import { Login } from '@/presentation/pages';
import { render, RenderResult } from '@testing-library/react';

type SutTypes = {
  sut: RenderResult;
};

const SystemUnderTestCreator = (): SutTypes => {
  const sut = render(<Login />);

  return {
    sut,
  };
};

describe('Login', () => {
  it('Should start with initial state', () => {
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
});

