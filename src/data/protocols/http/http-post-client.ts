import { HttpResponse } from '@/data/protocols';

type HttpPostParams = {
  url: string;
  body?: any;
};

interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>;
}

export { HttpPostClient, HttpPostParams };

