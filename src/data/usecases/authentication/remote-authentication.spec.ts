import { HttpStatusCode } from '@/data/protocols';
import { HttpPostClientSpy } from '@/data/test';
import { RemoteAuthentication } from '@/data/usecases';
import { InvalidCredentialsError } from '@/domain/error';
import { mockAuthentication } from '@/domain/test';
import faker from 'faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const SystemUnderTestCreator = (
  url: string = faker.internet.url()
): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('Remote Authentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = SystemUnderTestCreator(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = SystemUnderTestCreator();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', () => {
    const { sut, httpPostClientSpy } = SystemUnderTestCreator();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});

