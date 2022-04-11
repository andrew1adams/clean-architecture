import React from 'react';
import { Login } from '@/presentation/pages';
import { RemoteAuthentication } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/protocols';
import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

const LoginComponent: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};

export { LoginComponent };

