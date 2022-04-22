import * as faker from 'faker'

const mockEmailInUseError = (url: string): void => {
  cy.intercept('POST', RegExp(url), {
    statusCode: 403,
    body: {
      error: faker.random.words()
    }
  }).as(url)
}
const emailInUseError = (): void => {
  mockEmailInUseError('signup')
}

const mockSignUpRequest = { emailInUseError }

export { mockSignUpRequest }
