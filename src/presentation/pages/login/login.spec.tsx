import React from 'react';
import { Login } from '@/presentation/pages';
import { render } from '@testing-library/react';

describe('Login', () => {
  it('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />);
    const errorWrapper = getByTestId('error-wrapper');
    expect(errorWrapper.childElementCount).toBe(0);
  });
});

