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
    cy.getByTestId('password-input').focus().type('1234', { force: true })
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid Field')
      .should('have.css', 'background-color', 'rgb(255, 82, 82)')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })
})
