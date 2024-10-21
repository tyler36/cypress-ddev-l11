/**
 * Assert "string" exists within body
 * @param {string} text   Text to find
 */
let stringExist = (string) => cy.get(`body`).contains(string)

/**
 * Assert "string" does NOT exist within body
 * @param {string} string   Text to find
 */
let stringNotExist = (string) => cy.get(`body`).should('not.contain', string)

Cypress.Commands.add('stringExist', stringExist)
Cypress.Commands.add('stringNotExist', stringNotExist)
