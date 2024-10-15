/**
 * Browser URL should match baseURL + "path"
 * @param {string} path appearing after baseURL
 */
let pathEqual = path => cy.url().should( 'eql', Cypress.config().baseUrl + `${path}` );

/**
 * Browser URL should NOT match baseURL + "path"
 * @param {string} path appearing after baseURL
 */
let pathNotEqual = path => cy.url().should( 'not.be', Cypress.config().baseUrl + `${path}` );

/**
 * Browser URL should include the "path"
 * @param {string} path appearing after baseURL
 */
let pathIncludes = path => cy.url().should( 'include', path );

/**
 * Browser URL should NOT include the "path"
 * @param {string} path appearing after baseURL
 */
let pathNotIncludes = path => cy.url().should( 'not.include', path );

/**
 * Request "path" and expect a "statusCode"
 * @param {string} path appearing after baseURL
 */
let expectStatus = ( path, statusCode ) => cy.request( {
    url: path,
    failOnStatusCode: false
} ).then( response => {
    expect( response.status ).to.eql( statusCode );
} );


Cypress.Commands.add( 'pathEqual', pathEqual );
Cypress.Commands.add( 'pathNotEqual', pathNotEqual );
Cypress.Commands.add( 'pathIncludes', pathIncludes );
Cypress.Commands.add( 'pathNotIncludes', pathNotIncludes );

Cypress.Commands.add( 'expectStatus', expectStatus );
