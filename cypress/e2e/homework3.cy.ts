describe('Recently viewed products', () => {

    before('Open login page', () => {
        cy.login('maira.maksimova01', Cypress.env('password'));
    })
  
    it('Check item appears in recently viewed products if open from Search', () => {
        cy.getTile('Electronics')
        .click()
        .getTiles()
        .eq(1)
        .find('h3')
        .then(($product) => { 
            cy.get('.search-trigger')
            .click()
            .get('#ajax_searchform input')
            .type($product.text())
            .get('.kleo_ajax_results')
            .contains($product.text())
            .click();

            cy.contains('Billboard')
            .click()
            cy.get('#woocommerce_recently_viewed_products-2')
            .should('to.contain', $product.text());
        })
    })
  })