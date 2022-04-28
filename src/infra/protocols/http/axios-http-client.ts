import axios, { AxiosResponse } from 'axios'

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols'

class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (err) {
      axiosResponse = err.response
    }

    return this.adaptResponse(axiosResponse)
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(params.url)
    } catch (err) {
      axiosResponse = err.response
    }

    return this.adaptResponse(axiosResponse)
  }

  private adaptResponse(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}

export { AxiosHttpClient }
