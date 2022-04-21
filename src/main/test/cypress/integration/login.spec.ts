import * as faker from 'faker'
import { mockHttpRequests } from '../support/mock-http-request'
import { testFormHelper } from '../support/test-form-helper'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-input').should('be.empty').should('have.attr', 'readonly')
    testFormHelper.testStatusField('email', 'Required Field')
    cy.getByTestId('password-input').should('be.empty').should('have.attr', 'readonly')
    testFormHelper.testStatusField('password', 'Required Field')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email-input').focus().type(faker.random.word())
    testFormHelper.testStatusField('email', 'Invalid Field')
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(4))
    testFormHelper.testStatusField('password', 'Invalid Field')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    testFormHelper.testStatusField('email')
    cy.getByTestId('password-input').focus().type(faker.internet.password())
    testFormHelper.testStatusField('password')
    cy.getByTestId('submit-btn').should('not.be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError', () => {
    mockHttpRequests.invalidCredentialsError()
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.internet.password())
    cy.getByTestId('submit-btn').click()
    cy.wait('@login').then(XMLHttpRequest => {
      expect(XMLHttpRequest.response.statusCode).to.eq(401)
      expect(XMLHttpRequest.response.body).haveOwnProperty('error')
    })
    testFormHelper.testExpectedError('Invalid Credentials')
    testFormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError', () => {
    const statusCode = faker.helpers.randomize([400, 404, 500])
    mockHttpRequests.unexpectedError(statusCode)
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.internet.password())
    cy.getByTestId('submit-btn').click()
    cy.wait('@login').then(XMLHttpRequest => {
      expect(XMLHttpRequest.response.statusCode).to.eq(statusCode)
      expect(XMLHttpRequest.response.body).haveOwnProperty('error')
    })
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Something was wrong, try again later.')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    mockHttpRequests.invalidData()
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.internet.password())
    cy.getByTestId('submit-btn').click()
    cy.wait('@login').then(XMLHttpRequest => {
      expect(XMLHttpRequest.response.statusCode).to.eq(200)
      expect(XMLHttpRequest.response.body).haveOwnProperty('invalidData')
    })
    testFormHelper.testExpectedError('Something was wrong, try again later.')
    testFormHelper.testUrl('/login')
  })

  it('Should present SaveAccessToken if valid credentials are provided', () => {
    mockHttpRequests.successRequest()
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(`${faker.internet.password()}{enter}`)
    cy.wait('@login').then(XMLHttpRequest => {
      expect(XMLHttpRequest.response.statusCode).to.eq(200)
      expect(XMLHttpRequest.response.body).haveOwnProperty('accessToken')
    })
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    testFormHelper.testUrl()
    testFormHelper.testLocalSTorageItem('accessToken')
  })

  it('Should prevents multiple submits', () => {
    mockHttpRequests.successRequest()
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.internet.password())
    cy.getByTestId('submit-btn').dblclick()
    cy.get('@login.all').its('length').should('eq', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockHttpRequests.successRequest()
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('submit-btn').click({ force: true })
    cy.get('@login.all').its('length').should('eq', 0)
  })
})
