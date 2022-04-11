import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Input } from '@/presentation/components';
import { LoginFormContext } from '@/presentation/contexts';

const SystemUnderTestCreator = (): RenderResult =>
  render(
    <LoginFormContext.Provider value={{ state: {} }}>
      <Input name="field" />
    </LoginFormContext.Provider>
  );

describe('Input Component', () => {
  test('Should begin with readonly', () => {
    const sut = SystemUnderTestCreator();

    const input = sut.getByTestId('field-input') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});

