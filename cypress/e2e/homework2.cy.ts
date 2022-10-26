describe('Verify Billboard product count by category', () => {

  before('Open login page', () => {
      cy.login('maira.maksimova01', Cypress.env('password'));
  })

  it.only('Verify product count on Billboard vs actual', () => {
      const pages = ['Electronics', 'Food', 'Other', 'Real estate', 'Transport'];
      pages.forEach(page => {

          cy.getTile(page).as('tile').getCount().then(($count) => {
              //Open product category
              cy.get('@tile').click();
              //count actual ptoducts (tiles)
              cy.countTiles().then((actualCount) => {
                  //assert
                  expect($count).to.equal(actualCount)
                  //Navigate back to Billboard
                  cy.get('#main div.breadcrumb a').click();
              })
          })
      })

  })
})