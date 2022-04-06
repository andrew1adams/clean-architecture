import { HttpPostClient, HttpPostParams } from '@/data/protocols';

class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: any;

  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve();
  }
}

export { HttpPostClientSpy };

