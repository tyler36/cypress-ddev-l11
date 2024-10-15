/**
 * Click on an element "selector"
 * @param {string} selector element
 */
let clickSelector = selector => cy.get( selector ).click( {
    force: true
} );

/**
 * Click on an the first element containing the "text"
 * @param {string} text     needle to find
 */
let clickText = ( text ) => cy.contains( text ).click( {
    force: true
} );

/**
 * Click on an the first element containing the "text" within the "selector" element
 * @param {string} text     needle to find
 * @param {string} selector haystack selector to search
 */
let clickTextIn = ( text, selector ) => cy.get( selector ).within( () => clickText( text ) );

/**
 * Select checkbox/radio element by "selector"
 * @param {string} selector element
 */
let checkSelector = selector => cy.get( selector ).check( {
    force: true
} );

/**
 * Select an option in a select "name"
 * @param {string} value    'value' to select
 * @param {string} selector element
 */
let selectOption = (value, selector) => {
    if (selector.match(/^[0-9a-z_]+$/)) {
        selector = `[name="${selector}"]`;
    }

    cy.get( selector ).select(value, {
        force: true
    });
}


/**
 * Alias to submit a form by clicking on a "selector"
 * @param {string} selector Submit button selector
 */
let submit = ( selector = '#edit-submit' ) => clickSelector( selector );


Cypress.Commands.add( 'clickSelector', clickSelector );
Cypress.Commands.add( 'clickText', clickText );
Cypress.Commands.add( 'clickTextIn', clickTextIn );
Cypress.Commands.add( 'checkSelector', checkSelector );
Cypress.Commands.add( 'selectOption', selectOption );
Cypress.Commands.overwrite('submit', submit)
