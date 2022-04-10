import React, { useContext } from 'react';
import { Spinner } from '@/presentation/components';
import Styles from './form-status.module.scss';
import { LoginFormContext } from '@/presentation/contexts';

const { errorWrapper, spinnerWrapper, error } = Styles;

const FormStatus: React.FC = () => {
  const {
    state: { isLoading, errorMessage },
  } = useContext(LoginFormContext);

  return (
    <div data-testid="error-wrapper" className={errorWrapper}>
      {isLoading && <Spinner className={spinnerWrapper} />}
      {errorMessage && (
        <span data-testid="main-error" className={error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export { FormStatus };

