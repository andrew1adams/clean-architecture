import { AxiosHttpClient } from '@/infra/protocols';
import axios, { Axios } from 'axios';
import faker from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const SystemUnderTestCreator = (): AxiosHttpClient => new AxiosHttpClient();

describe('Axios Http Client', () => {
  test('Should call axios with correct URL', async () => {
    const url = faker.internet.url();
    const sut = SystemUnderTestCreator();
    sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});

