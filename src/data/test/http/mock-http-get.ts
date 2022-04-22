import { HttpGetClient, HttpGetParams } from '@/data/protocols'

class HttpGetClientSpy implements HttpGetClient {
  url: string
  async get({ url }: HttpGetParams): Promise<void> {
    this.url = url
  }
}

export { HttpGetClientSpy }
