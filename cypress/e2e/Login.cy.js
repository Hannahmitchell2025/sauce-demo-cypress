// cypress/e2e/login.cy.js
describe('Sauce Demo - Login tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('TC-WEB-001: Login with valid user should redirect to inventory', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.wait(2000)


    // assert URL & inventory content
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('exist')
    cy.get('.inventory_item').should('have.length.greaterThan', 0)
    cy.wait(2000)
  })

  it('TC-WEB-002: Login with invalid password shows error', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()
    cy.wait(2000)

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain.text', 'Username and password do not match')
      cy.wait(2000)
  })
})

