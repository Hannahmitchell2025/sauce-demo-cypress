describe('Sauce Demo - Product sorting', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })

  it('TC-WEB-009: Sort items by price (low to high)', () => {
    cy.get('.product_sort_container').select('lohi')
    cy.get('.inventory_item_price').then(($prices) => {
      const values = [...$prices].map(p => parseFloat(p.innerText.replace('$', '')))
      const sorted = [...values].sort((a, b) => a - b)
      expect(values).to.deep.equal(sorted)
    })
  })
})
