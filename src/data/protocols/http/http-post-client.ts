import { HttpResponse } from '@/data/protocols'

type HttpPostParams = {
  url: string
  body?: any
}

interface HttpPostClient<R = any> {
  post: (params: HttpPostParams) => Promise<HttpResponse<R>>
}

export { HttpPostClient, HttpPostParams }
