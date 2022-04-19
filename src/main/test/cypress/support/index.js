import faker from 'faker'

Cypress.Commands.add('getByTestId', id => cy.get(`[data-testid=${id}]`))
Cypress.Commands.add('faker', () => faker)
