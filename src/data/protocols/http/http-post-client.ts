import { HttpResponse } from '@/data/protocols'

type HttpPostParams<B = any> = {
  url: string
  body?: B
}

interface HttpPostClient<B = any, R = any> {
  post: (params: HttpPostParams<B>) => Promise<HttpResponse<R>>
}

export { HttpPostClient, HttpPostParams }
