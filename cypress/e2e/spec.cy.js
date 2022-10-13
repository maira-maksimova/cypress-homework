describe('Cypress first homework', () => {

  beforeEach('Open login page', () => {
    cy.visit('https://intranet.ctco.lv/')
  })

  it('Successfull login to Intranet', () => {
    cy.get('#username').type('maira.maksimova01');
    cy.get('#password').type(Cypress.env('password'), {log: false});
    cy.get('.btn-submit').click();
    cy.get('.logout-button').should('be.visible');
  })
  it('Failed login to Intranet', () => {
    cy.get('#username').type('test_username');
    cy.get('#password').type('invalid');
    cy.get('.btn-submit').click();
    cy.get('div#msg.errors').should('be.visible').and('include.text', 'Invalid credentials');
  })
  it('Login and Logout from Intranet', () => {
    cy.get('#username').type('maira.maksimova01');
    cy.get('#password').type(Cypress.env('password'), {log: false});
    cy.get('.btn-submit').click();
    cy.get('.logout-button').should('be.visible').click();
    cy.get('#msg').should('be.visible').and('include.text', 'Logout successful');
  })
})