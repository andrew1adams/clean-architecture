import { HttpPostParams } from '@/data/protocols';
import { AxiosHttpClient } from '@/infra/protocols';
import axios from 'axios';
import faker from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number(),
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const SystemUnderTestCreator = (): AxiosHttpClient => new AxiosHttpClient();

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('Axios Http Client', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = SystemUnderTestCreator();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', async () => {
    const sut = SystemUnderTestCreator();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});

