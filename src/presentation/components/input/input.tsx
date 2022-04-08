import { LoginFormContext } from '@/presentation/contexts';
import React, { useContext } from 'react';
import Styles from './input.module.scss';

const { inputWrapper, status } = Styles;

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const state = useContext(LoginFormContext);
  const errorStatus = state[`${props.name}Error`];

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    ev.target.readOnly = false;
  };

  const getStatus = (): string => `${status} error`;

  const getTitle = (): string => errorStatus;

  return (
    <div className={inputWrapper}>
      <input
        data-testid={`${props.name}-input`}
        {...props}
        readOnly
        onFocus={handleFocus}
      />
      <span
        title={getTitle()}
        data-testid={`${props.name}-status`}
        className={getStatus()}
      />
    </div>
  );
};

export { Input };

