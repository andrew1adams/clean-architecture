enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
}

type HttpResponse = {
  statusCode: HttpStatusCode;
};

export { HttpResponse, HttpStatusCode };

