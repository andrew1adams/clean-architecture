type HttpGetParams = {
  url: string
}

interface HttpGetClient {
  get: (params: HttpGetParams) => Promise<void>
}

export { HttpGetClient, HttpGetParams }
