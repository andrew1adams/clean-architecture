import * as faker from 'faker'

const mockEmailInUseError = (url: string): void => {
  cy.intercept('POST', RegExp(url), {
    statusCode: 403,
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

const emailInUseError = (): void => {
  mockEmailInUseError('signup')
}

const unexpectedError = (statusCode: number): void => {
  mockUnexpectedError('signup', 'POST', statusCode)
}

const successRequest = (): void => {
  mockSuccess('signup', 'POST', { accessToken: faker.random.uuid() })
}

const invalidData = (): void => {
  mockSuccess('signup', 'POST', { invalidData: faker.random.uuid() })
}

const mockSignUpRequest = { emailInUseError, unexpectedError, invalidData, successRequest }

export { mockSignUpRequest }
