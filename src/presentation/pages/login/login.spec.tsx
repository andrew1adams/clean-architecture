import React from 'react';
import { Login } from '@/presentation/pages';
import { render } from '@testing-library/react';

describe('Login', () => {
  it('Should start with initial state', () => {
    const { getByTestId } = render(<Login />);

    const errorWrapper = getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);

    const submitBtn = getByTestId('submit-btn') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });
});

