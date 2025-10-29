describe('Sauce Demo - Cart actions', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.wait(1000)
  })

  it('TC-WEB-007: Add item to cart increases cart count', () => {
    cy.get('.inventory_item').first().find('button').click()
    cy.get('.shopping_cart_badge').should('contain', '1')
  })

  it('TC-WEB-008: Remove item from cart decreases cart count', () => {
    cy.get('.inventory_item').first().find('button').click()
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_button').click()
    cy.get('.shopping_cart_badge').should('not.exist')
  })
})
