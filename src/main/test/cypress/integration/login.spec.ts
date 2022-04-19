import * as faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-input').should('be.empty').should('have.attr', 'readonly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required Field')
      .should('have.css', 'background-color', 'rgb(255, 82, 82)')
    cy.getByTestId('password-input').should('be.empty').should('have.attr', 'readonly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required Field')
      .should('have.css', 'background-color', 'rgb(255, 82, 82)')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email-input').focus().type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Invalid Field')
      .should('have.css', 'background-color', 'rgb(255, 82, 82)')
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid Field')
      .should('have.css', 'background-color', 'rgb(255, 82, 82)')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Filled in Correctly')
      .should('have.css', 'background-color', 'rgb(0, 200, 83)')
    cy.getByTestId('password-input').focus().type(faker.internet.password())
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Filled in Correctly')
      .should('have.css', 'background-color', 'rgb(0, 200, 83)')
    cy.getByTestId('submit-btn').should('not.be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })
})
