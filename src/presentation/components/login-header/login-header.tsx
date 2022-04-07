import React, { memo } from 'react';
import { Logo } from '@/presentation/components';
import Styles from './login-header.module.scss';

const { header } = Styles;

const LoginHeader: React.FC = memo(() => {
  return (
    <header className={header}>
      <Logo />
      <h1>4Dev - Surveys for Programmers</h1>
    </header>
  );
});

export { LoginHeader };

