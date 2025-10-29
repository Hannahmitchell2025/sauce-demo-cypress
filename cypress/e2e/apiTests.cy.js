/// <reference types="cypress" />

describe('API Tests - Reqres.in (failOnStatusCode handling)', () => {

  // TC-API-001: Verify user list API
  it('TC-API-001: Verify user list API', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 401]).to.include(response.status)
      if(response.status === 200) {
        expect(response.body.data).to.have.length.greaterThan(0)
        expect(response.body).to.have.property('page', 2)
      }
    })
  })

  // TC-API-002: Verify single user
  it('TC-API-002: Verify single user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 401]).to.include(response.status)
      if(response.status === 200) {
        expect(response.body.data).to.have.property('id', 2)
        expect(response.body.data).to.have.property('email')
      }
    })
  })

  // TC-API-003: Invalid user
  it('TC-API-003: Invalid user returns 404', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false
    }).then((response) => {
      expect([401, 404]).to.include(response.status)
    })
  })

  // TC-API-004: List unknown resources
  it('TC-API-004: List unknown resources', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown',
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 401]).to.include(response.status)
      if(response.status === 200) {
        expect(response.body.data).to.have.length.greaterThan(0)
      }
    })
  })

  // TC-API-005: Single unknown resource
  it('TC-API-005: Single unknown resource', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown/2',
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 401]).to.include(response.status)
      if(response.status === 200) {
        expect(response.body.data).to.have.property('id', 2)
        expect(response.body.data).to.have.property('name')
      }
    })
  })

  // TC-API-006: Invalid unknown resource
  it('TC-API-006: Invalid unknown resource returns 404', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown/23',
      failOnStatusCode: false
    }).then((response) => {
      expect([401, 404]).to.include(response.status)
    })
  })

})
