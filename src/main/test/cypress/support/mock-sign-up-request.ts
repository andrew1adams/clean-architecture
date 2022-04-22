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

const emailInUseError = (): void => {
  mockEmailInUseError('signup')
}

const unexpectedError = (statusCode: number): void => {
  mockUnexpectedError('signup', 'POST', statusCode)
}

const mockSignUpRequest = { emailInUseError, unexpectedError }

export { mockSignUpRequest }
