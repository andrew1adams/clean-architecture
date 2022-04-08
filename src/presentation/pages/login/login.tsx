import {
  Footer,
  Input,
  LoginHeader,
  FormStatus,
} from '@/presentation/components';
import { LoginFormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols';
import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';

const { login, form, submit, link } = styles;

type LoginProps = {
  validation: Validation;
};

const Login: React.FC<LoginProps> = ({ validation }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Required Field',
    passwordError: 'Required Field',
    errorMessage: '',
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  useEffect(() => {
    validation.validate({ password: state.password });
  }, [state.password]);

  return (
    <div className={login}>
      <LoginHeader />
      <LoginFormContext.Provider value={{ state, setState }}>
        <form className={form}>
          <h2>Login</h2>
          <Input name="email" type="email" placeholder="Insert your email" />
          <Input
            type="password"
            name="password"
            placeholder="Insert your password"
          />

          <button
            data-testid="submit-btn"
            disabled
            className={submit}
            type="submit"
          >
            Sign In
          </button>
          <span className={link}>sign up</span>
          <FormStatus />
        </form>
      </LoginFormContext.Provider>
      <Footer />
    </div>
  );
};

export { Login };

