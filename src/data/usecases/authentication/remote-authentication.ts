import { HttpPostClient } from '@/data/protocols';
import { AuthenticationParams } from '@/domain/usecases';

class RemoteAuthentication {
  private readonly url: string;
  private readonly httpPostClient: HttpPostClient;

  constructor(url: string, httpPostClient: HttpPostClient) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params });
  }
}

export { RemoteAuthentication };

