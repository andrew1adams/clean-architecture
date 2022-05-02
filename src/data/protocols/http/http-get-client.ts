import { HttpResponse } from '@/data/protocols'

type HttpGetParams = {
  url: string
  headers?: any
}

interface HttpGetClient<R = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}

export { HttpGetClient, HttpGetParams }
