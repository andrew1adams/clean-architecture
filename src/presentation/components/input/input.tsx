import React from 'react';
import Styles from './input.module.scss';

const { inputWrapper, status } = Styles;

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={inputWrapper}>
      <input {...props} />
      <span className={status} />
    </div>
  );
};

export { Input };

