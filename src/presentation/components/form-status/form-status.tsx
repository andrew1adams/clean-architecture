import React from 'react';
import { Spinner } from '@/presentation/components';
import Styles from './form-status.module.scss';

const { errorWrapper, spinnerWrapper, error } = Styles;

const FormStatus: React.FC = () => {
  return (
    <div className={errorWrapper} data-testid="error-wrapper">
      <Spinner className={spinnerWrapper} />
      <span className={error}>Error</span>
    </div>
  );
};

export { FormStatus };

