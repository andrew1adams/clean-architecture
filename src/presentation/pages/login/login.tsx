import { Authentication } from '@/domain/usecases';
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
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
}: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    errorMessage: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (state.isLoading) return;

    setState({
      ...state,
      isLoading: true,
    });
    await authentication.auth({ email: state.email, password: state.password });
  };

  return (
    <div className={login}>
      <LoginHeader />
      <LoginFormContext.Provider value={{ state, setState }}>
        <form className={form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input name="email" type="email" placeholder="Insert your email" />
          <Input
            type="password"
            name="password"
            placeholder="Insert your password"
          />

          <button
            data-testid="submit-btn"
            disabled={!!state.emailError || !!state.passwordError}
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

