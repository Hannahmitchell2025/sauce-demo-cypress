describe('Sauce Demo - Checkout flow', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.wait(2000)
  })

  it('TC-WEB-005: Successful checkout (happy path)', () => {
    cy.get('.inventory_item').first().find('button').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()
    cy.wait(2000)

    cy.get('#first-name').type('xyz')
    cy.get('#last-name').type('abc')
    cy.get('#postal-code').type('54000')
    cy.get('#continue').click()
    cy.get('#finish').click()
    cy.wait(2000)

    cy.get('.complete-header').should('contain', 'Thank you for your order!')
    cy.wait(1000)
  })

  it('TC-WEB-006: Checkout with empty cart should show empty checkout summary', () => {
    // Go to cart without adding items
    cy.get('.shopping_cart_link').click()

    // Click checkout button (it exists even if cart is empty)
    cy.get('#checkout').click()
    cy.wait(1000)

    // Fill out checkout info form
    cy.get('#first-name').type('xyz')
    cy.get('#last-name').type('abc')
    cy.get('#postal-code').type('54000')
    cy.get('#continue').click()
    cy.wait(2000)

    // Expect no items shown in checkout overview
    cy.get('.cart_item').should('not.exist')
    cy.wait(1000)

    // Optional: assert that summary info section exists
    cy.get('.summary_info').should('exist')
    cy.wait(1000)
  })
})
