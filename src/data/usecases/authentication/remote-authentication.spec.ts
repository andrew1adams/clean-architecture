import { HttpPostClientSpy } from '../../test';
import { RemoteAuthentication } from './remote-authentication';
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
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});

