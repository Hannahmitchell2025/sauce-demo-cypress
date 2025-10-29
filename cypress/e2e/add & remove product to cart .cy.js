
describe('Sauce Demo - Cart tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.wait(2000)
  })

  it('TC-WEB-003: Add product to cart', () => {
    cy.get('.inventory_item').first().find('button').click()
    cy.get('.shopping_cart_badge').should('contain', '1')
    cy.wait(2000)
  })

  it('TC-WEB-004: Remove product from cart', () => {
    cy.get('.inventory_item').first().find('button').click()
    cy.get('.shopping_cart_badge').should('contain', '1')

    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').find('button').click()

    cy.get('.cart_item').should('not.exist')
    cy.wait(2000)
  })
})
