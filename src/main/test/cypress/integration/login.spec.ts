describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required Field')
      .should('have.css', 'background-color', 'rgb(255, 82, 82)')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required Field')
      .should('have.css', 'background-color', 'rgb(255, 82, 82)')
    cy.getByTestId('submit-btn').should('be.disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })
})
