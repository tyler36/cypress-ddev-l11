/**
 * The following modules are required:
 *    - jsonapi (serialization)
 *
 * Ensure the user has the required permissions
 */

/**
 * @description          Add a new new node
 * @param {string} type  Node content type
 * @param {string} data  Node fields Will be parse by JSON
 * @param {object} owner Drupal owner
 */
let seedNode = ( type, data, owner = "editor123" ) => {
    let users = Object.fromEntries( Object.entries( Cypress.env( 'users' ) )
        .filter( ( [ key, value ] ) => value.name === owner ) );

    if ( !Object.keys( users ).length ) {
        throw new Error( `${owner} does not exist in ENV` );
    }

    let user = users[ Object.keys( users )[ 0 ] ];

    cy.getRestToken( user.name, user.password ).then(
        token => cy.createNode( token, type, JSON.parse( data.replaceAll( '\'', '"' ) ) )
    );
}

/**
 * @description               Generate a token for REST authentication
 * @param {string} name       Username
 * @param {string} password   Password
 * @return {object}           Cypress $Chainer
 */
Cypress.Commands.add('getRestToken', (user, password) => {
  cy.login(user, password);

  return cy.request({
    method: 'GET',
    url: '/session/token',
  }).its('body');
});

/**
 * @description             Create a new node
 * @param {string} token    Authentication token. Use 'getRestToken()' command to generate
 * @param {string} nodeType Drupal node type
 * @param {object} fields   { field: value } for nodeType
 * @return {object}         Cypress $Chainer
 */
Cypress.Commands.add('createNode', (token, nodeType, fields) => {
  return cy.request({
    method: 'POST',
    url: `/jsonapi/node/${nodeType}`,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'X-CSRF-Token': token
    },
    body: {
      data: {
        type: `node--${nodeType}`,
        attributes: fields
      }
    },
  }).its('body');
});


/**
 * @description             Delete a 'node'
 * @param {string} token    Authentication token. Use 'getRestToken()' command to generate
 * @param {string} nodeType Drupal node type
 * @param {uuid} uuid       { field: value } for nodeType
 * @return {object}         Cypress $Chainer
 */
Cypress.Commands.add('deleteNode', (token, nodeType, uuid) => {
  return cy.request({
    method: 'DELETE',
    url: `/jsonapi/node/${nodeType}/${uuid}`,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'X-CSRF-Token': token
    },
  }).its('body');
});


/**
 * @description             Delete a 'node'
 * @param {string} token    Authentication token. Use 'getRestToken()' command to generate
 * @param {string} nodeType Drupal node type
 * @param {string} title     String to match against 'title' field
 * @returns {object}        Nodes of type "nodeType" that have a title matching
 */
Cypress.Commands.add('getNodesWithTitle', (token, nodeType, title) => {
  return cy.request({
    method: 'GET',
    url: `/jsonapi/node/${nodeType}?filter[article-title][path]=title&filter[article-title][value]=${title}`,
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'X-CSRF-Token': token
    },
  }).then(res => {
    return res.body.data;
  });
});

/**
 * @description             Delete all nodes that match the title
 * @param {string} token    Authentication token. Use 'getRestToken()' command to generate
 * @param {string} title    String to match against 'title' field
 * @returns {object}        Nodes of type "nodeType" that have a title matching
 */
Cypress.Commands.add('deleteByTitle', (token, title) => {
  return cy.getNodesWithTitle(token, 'article', title)
    .then(nodes => {
      nodes.map(function(node){
        cy.deleteNode(token, 'article', node.id);
      });
    });
});

Cypress.Commands.add( 'seedNode', seedNode );
