import { HttpPostParams } from '@/data/protocols';
import { AxiosHttpClient } from '@/infra/protocols';
import axios from 'axios';
import faker from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const SystemUnderTestCreator = (): AxiosHttpClient => new AxiosHttpClient();

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('Axios Http Client', () => {
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest();
    const sut = SystemUnderTestCreator();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});

