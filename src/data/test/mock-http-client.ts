import { HttpPostClient } from '@/data/protocols';

class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post(url: string): Promise<void> {
    this.url = url;

    return Promise.resolve();
  }
}

export { HttpPostClientSpy };

