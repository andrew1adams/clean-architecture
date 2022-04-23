import { HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols'
import axios, { AxiosResponse } from 'axios'

class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (err) {
      axiosResponse = err.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get(params: HttpGetParams): Promise<void> {
    await axios.get(params.url)
  }
}

export { AxiosHttpClient }
