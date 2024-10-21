/**
 * Enter a "value" into a "name" form element
 * @param {string} value    data to enter into form
 * @param {string} name     "name" attribute of form element
 */
let typeStringInto = ( value, name ) => cy.get( `[name="${name}"]` )
    .clear( {
        force: true
    } )
    .type( value, {
    force: true
} );

/**
 * Enter a "value" into a "name" form element controlled by CKEditor
 * @param {string} value    data to enter into form
 * @param {string} name     "name" attribute of form element
 */
let typeStringIntoCkeditor = ( value, name ) => {
    cy.ckeditor_type( name, value );
};

Cypress.Commands.add( 'typeStringInto', typeStringInto );
Cypress.Commands.add( 'typeStringIntoCkeditor', typeStringIntoCkeditor );
