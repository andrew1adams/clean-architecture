import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '@/presentation/components';
import { LoginFormContext } from '@/presentation/contexts';

describe('Input Component', () => {
  test('Should begin with readonly', () => {
    const { getByTestId } = render(
      <LoginFormContext.Provider value={{ state: {} }}>
        <Input name="field" />
      </LoginFormContext.Provider>
    );

    const input = getByTestId('field-input') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});

