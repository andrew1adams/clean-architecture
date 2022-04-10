import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { Authentication, AuthenticationParams } from '@/domain/usecases';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount: number = 0;

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;

    return Promise.resolve(this.account);
  }
}

export { AuthenticationSpy };

