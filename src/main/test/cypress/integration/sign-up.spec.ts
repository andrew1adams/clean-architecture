import { testFormHelper } from '../support/test-form-helper'

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
})
