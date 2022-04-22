import * as faker from 'faker'

const mockInvalidCredentialsError = (url: string): void => {
  cy.intercept('POST', RegExp(url), {
    statusCode: 401,
    body: {
      error: faker.random.words()
    }
  }).as(url)
}

const mockUnexpectedError = (url: string, method, statusCode: number): void => {
  cy.intercept(method, RegExp(url), {
    statusCode: statusCode,
    body: {
      error: faker.random.words()
    }
  }).as(url)
}

const mockSuccess = (url: string, method, response: any): void => {
  cy.intercept(method, RegExp(url), {
    statusCode: 200,
    body: response
  }).as(url)
}

const invalidCredentialsError = (): void => {
  mockInvalidCredentialsError('login')
}
const unexpectedError = (statusCode: number): void => {
  mockUnexpectedError('login', 'POST', statusCode)
}
const successRequest = (): void => {
  mockSuccess('login', 'POST', { accessToken: faker.random.uuid() })
}
const invalidData = (): void => {
  mockSuccess('login', 'POST', { invalidData: faker.random.uuid() })
}

const mockLoginRequest = {
  invalidCredentialsError,
  unexpectedError,
  successRequest,
  invalidData
}

export { mockLoginRequest }
