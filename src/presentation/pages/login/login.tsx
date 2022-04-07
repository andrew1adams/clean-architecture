import { Footer, Input, LoginHeader, Spinner } from '@/presentation/components';
import { FormStatus } from '@/presentation/components/form-status/form-status';
import React from 'react';
import styles from './login.module.scss';

const { login, form, submit, link, errorWrapper, error, spinner } = styles;

const Login: React.FC = () => {
  return (
    <div className={login}>
      <LoginHeader />
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
      <Footer />
    </div>
  );
};

export { Login };

