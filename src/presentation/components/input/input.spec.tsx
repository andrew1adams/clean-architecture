import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { Input } from '@/presentation/components';
import { LoginFormContext } from '@/presentation/contexts';
import faker from 'faker';

const SystemUnderTestCreator = (field: string): RenderResult =>
  render(
    <LoginFormContext.Provider value={{ state: {} }}>
      <Input name={field} />
    </LoginFormContext.Provider>
  );

describe('Input Component', () => {
  test('Should begin with readonly', () => {
    const field = faker.random.word();
    const sut = SystemUnderTestCreator(field);

    const input = sut.getByTestId(`${field}-input`) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('Should remove readonly on focus', () => {
    const field = faker.random.word();
    const sut = SystemUnderTestCreator(field);

    const input = sut.getByTestId(`${field}-input`) as HTMLInputElement;
    fireEvent.focus(input);

    expect(input.readOnly).toBe(false);
  });
});

