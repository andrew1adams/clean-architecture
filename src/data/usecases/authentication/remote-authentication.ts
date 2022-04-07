import { HttpPostClient, HttpStatusCode } from '@/data/protocols';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/error';
import { AuthenticationParams } from '@/domain/usecases';

class RemoteAuthentication {
  private readonly url: string;
  private readonly httpPostClient: HttpPostClient;

  constructor(url: string, httpPostClient: HttpPostClient) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export { RemoteAuthentication };

