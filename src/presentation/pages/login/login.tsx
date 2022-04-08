import {
  Footer,
  Input,
  LoginHeader,
  FormStatus,
} from '@/presentation/components';
import { LoginFormContext } from '@/presentation/contexts';
import React, { useState } from 'react';
import styles from './login.module.scss';

const { login, form, submit, link } = styles;

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({ isLoading: false, errorMessage: '' });

  return (
    <div className={login}>
      <LoginHeader />
      <LoginFormContext.Provider value={state}>
        <form className={form}>
          <h2>Login</h2>
          <Input name="email" type="email" placeholder="Insert your email" />
          <Input
            type="password"
            name="password"
            placeholder="Insert your password"
          />

          <button className={submit} type="submit">
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

