import { Footer, LoginHeader, Logo, Spinner } from '@/presentation/components';
import React from 'react';
import styles from './login.module.scss';

const {
  login,
  header,
  form,
  footer,
  inputWrapper,
  status,
  submit,
  link,
  errorWrapper,
  error,
  spinner,
} = styles;

const Login: React.FC = () => {
  return (
    <div className={login}>
      <LoginHeader />
      <form className={form}>
        <h2>Login</h2>
        <div className={inputWrapper}>
          <input name="email" type="email" placeholder="Insert your email" />
          <span className={status} />
        </div>
        <div className={inputWrapper}>
          <input
            type="password"
            name="password"
            placeholder="Insert your password"
          />
          <span className={status} />
        </div>

        <button className={submit} type="submit">
          Sign In
        </button>
        <span className={link}>sign up</span>
        <div className={errorWrapper}>
          <Spinner className={spinner} />
          <span className={error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export { Login };

