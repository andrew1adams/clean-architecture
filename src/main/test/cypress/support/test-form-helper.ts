const testStatusField = (field: string, error?: String): void => {
  cy.getByTestId(`${field}-status`).should(error ? 'have.attr' : 'not.have.attr', 'title')
  cy.getByTestId(`${field}-status`).should(
    'have.css',
    'background-color',
    error ? 'rgb(255, 82, 82)' : 'rgb(0, 200, 83)'
  )
}

const testExpectedError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('exist').should('contain.text', error)
}

const testUrl = (url: string = '/'): void => {
  cy.url().should('eq', `${Cypress.config('baseUrl')}${url}`)
}

const testLocalSTorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}

const testFormHelper = {
  testStatusField,
  testExpectedError,
  testUrl,
  testLocalSTorageItem
}

export { testFormHelper }
