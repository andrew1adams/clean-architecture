import { HttpPostClientSpy } from '../../test';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const SystemUnderTestCreator = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('Remote Authentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'other_url';
    const { sut, httpPostClientSpy } = SystemUnderTestCreator(url);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});

