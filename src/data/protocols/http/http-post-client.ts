type HttpPostParams = {
  url: string;
  body?: any;
};

interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>;
}

export { HttpPostClient, HttpPostParams };

