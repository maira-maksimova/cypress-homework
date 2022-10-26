// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('https://intranet.ctco.lv/billboard/');
    cy.get('#username').type(username);
    cy.get('#password').type(password, {log: false});
    cy.get('.btn-submit').click();
    cy.get('.logout-button').should('be.visible');
})

Cypress.Commands.add('getTile', (label: string) => {
    cy.get('#main-container li.product').contains(label)
})

Cypress.Commands.add('getTiles', () => {
    cy.get('#main-container li.product')
})

Cypress.Commands.add('getCount', {prevSubject: 'element'}, (subject) => {
    cy.wrap(subject).find('.count').then(($count) => {
        return cy.wrap(parseInt($count.text().replace(' Products', '')));
    })
})

Cypress.Commands.add('countTiles', () => {
    let productCount = 0;
    const countAllTiles = () => {
        cy.getTiles().its('length').then(($length) => {
            productCount += $length;
            cy.get('body').then((body) => {
                if (!(body.find('.next.page-numbers').length > 0)) {
                    // on last page, break out
                    return cy.wrap(productCount);
                }
                cy.wrap(body.find('.next.page-numbers')).click();
                countAllTiles()
            })
        })
    }
    countAllTiles();
})


declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): Chainable<void>
    }

    interface Chainable {
        getTile(label: string): Chainable<void>
    }

    interface Chainable {
        getTiles(): Chainable<Element>
    }

    interface Chainable {
        getCount(): Chainable<number>
    }

    interface Chainable {
        countTiles(): Chainable<number>
    }
}

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })