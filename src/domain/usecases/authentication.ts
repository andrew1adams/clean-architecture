import { AccountModel } from '@/domain/models';

type AuthenticationParams = {
  email: string;
  password: string;
};

interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>;
}

export { Authentication };

