import { testFormHelper } from '../support/test-form-helper'
import * as faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name-input').should('be.empty').should('have.attr', 'readonly')
    testFormHelper.testStatusField('name', 'Required Field')
    cy.getByTestId('email-input').should('be.empty').should('have.attr', 'readonly')
    testFormHelper.testStatusField('email', 'Required Field')
    cy.getByTestId('password-input').should('be.empty').should('have.attr', 'readonly')
    testFormHelper.testStatusField('password', 'Required Field')
    cy.getByTestId('passwordConfirmation-input').should('be.empty').should('have.attr', 'readonly')
    testFormHelper.testStatusField('passwordConfirmation', 'Required Field')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name-input').focus().type(faker.random.alphaNumeric(2))
    testFormHelper.testStatusField('name', 'Invalid Field')
    cy.getByTestId('email-input').focus().type(faker.random.word())
    testFormHelper.testStatusField('email', 'Invalid Field')
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(4))
    testFormHelper.testStatusField('password', 'Invalid Field')
    cy.getByTestId('passwordConfirmation-input').focus().type(faker.random.alphaNumeric(4))
    testFormHelper.testStatusField('passwordConfirmation', 'Invalid Field')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })
})
