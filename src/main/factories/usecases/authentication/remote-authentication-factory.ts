import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { AxiosHttpClientCreator, ApiURLCreator } from '@/main/factories';

const RemoteAuthenticationCreator = (): Authentication =>
  new RemoteAuthentication(ApiURLCreator(), AxiosHttpClientCreator());

export { RemoteAuthenticationCreator };

