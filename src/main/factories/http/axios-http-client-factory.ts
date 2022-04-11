import { AxiosHttpClient } from '@/infra/protocols';

const AxiosHttpClientCreator = (): AxiosHttpClient => new AxiosHttpClient();

export { AxiosHttpClientCreator };

