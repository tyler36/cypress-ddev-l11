import {login} from '../../fixtures/selectors.json';
let user = Cypress.env('users').authenticated;

/**
 * Logout any logged in user
 */
let asGuest = () => {
  cy.logout();
}

/**
 * Log in "name" into current session
 * @param {string} name
 */
let asUser = name => {
    let users = Cypress.env( 'users' );

    if ( Object.keys( users ).includes( name ) ) {
        return cy.login( users[ name ].name, users[ name ].password );
    }

    if ( !Object.values(user).includes( name )) {
      throw new Error( `${name} does not have a valid password` );
    }

    cy.login( user.name, user.password )

    return cy.visit('/');
};

/**
 * Ensure user of "role" exists by force creating if necessary.
 * @param {string} role
 */
let userShouldExist = role => {
    let user = Cypress.env( 'users' )[ role ];

    if ( !user.name ) {
        throw new Error( `${role} does not have a valid 'name': ${user.name}` );
    }

    if ( !user.password ) {
        throw new Error( `${role} does not have a valid 'password': ${user.password}` );
    }

    cy.userCreate( user.name, user.password, role );
}

/**
 * Enter login details for user
 * @param {string} username
 */
let enterLoginDetails = username => {
    let users = Object.fromEntries( Object.entries( Cypress.env( 'users' ) )
        .filter( ( [ key, value ] ) => value.name === username ) );

    if ( !Object.keys( users ).length ) {
        throw new Error( `${username} does not exist in ENV` );
    }

    let user = users[ Object.keys( users ) ];

    cy.get( '[name="name"]' ).type( user.name );
    cy.get( '[name="pass"]' ).type( user.password );
    cy.get( '#user-login-form [type="submit"]' ).click();
};

Cypress.Commands.add( 'asGuest', asGuest );
Cypress.Commands.add( 'asUser', asUser );
Cypress.Commands.add( 'userShouldExist', userShouldExist );
Cypress.Commands.add( 'enterLoginDetails', enterLoginDetails );
