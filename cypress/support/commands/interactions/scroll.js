/**
 * Scroll to position within selector
 * @param {string} position     relative position to scroll to
 * @param {string} selector     CSS selector
 */
let scrollToSelectorPosition = ( position = 'center', selector ) => cy.get( selector ).scrollTo( position );

/**
 * Scroll vertically a set amount
 * @param {number} pixels   Number of 'pixels' to scroll
 */
let scrollDistance = pixels => cy.scrollTo( 0, pixels );

Cypress.Commands.add( 'scrollDistance', scrollDistance );
Cypress.Commands.add( 'scrollToSelectorPosition', scrollToSelectorPosition );
