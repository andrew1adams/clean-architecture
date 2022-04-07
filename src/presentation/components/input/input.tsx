import React from 'react';
import Styles from './input.module.scss';

const { inputWrapper, status } = Styles;

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
    ev.target.readOnly = false;
  };

  return (
    <div className={inputWrapper}>
      <input {...props} readOnly onFocus={handleFocus} />
      <span className={status} />
    </div>
  );
};

export { Input };

