/**
 * Set header to relative, aka NOT sticky.
 */
let disableHeader = () => cy.get('header')
    .invoke('css', 'position', 'relative');

Cypress.Commands.add( 'disableHeader', disableHeader );
