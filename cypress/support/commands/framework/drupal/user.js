import {block} from '../../../fixtures/selectors.json';

/**
 * @description               Helper function to create a user
 * @param {string} name       Username
 * @param {string} password   Password
 * @return {void}             false
 */
const userCreate = ( name, pass ) => {
    cy.exec(
        `drush user:create "${name}" --password="${pass}"`, {
            failOnNonZeroExit: false
        }
    );
}

/**
 * @description             Cancel a user and all their content
 * @param {string} username  User to cancel
 * @return {void}         false
 */
const userCancelContent = username => cy.drupalDrushCommand( `user:cancel --delete-content ${username} --yes` );

/**
 * @description           Give a role to a user
 * @param {string} name   Account user 'name'
 * @param {string} role   Drupal 'role' attribute
 */
const userSetRole = ( name, role ) => cy.exec(
    `drush user-add-role ${role} ${name}`, {
        failOnNonZeroExit: false
    }
)

/**
 * @description           Create a new user
 * @param {string} name   name of user
 * @param {string} pass   password for user
 * @param {string} role   name of role. [null] if present, will set specifc role for user
 * @return {void}         false
 */
Cypress.Commands.add('userCreate', (name, pass, role = null) => {
  let user = userCreate(name, pass);

  if (role) {
    userSetRole( name, role );
  }
});

/**
 * @description               Cancel a user and remove all their content
 * @param {string} name       Username
 * @return {object}           Cypress $Chainer
 */
Cypress.Commands.add( 'userCancelContent', userCancelContent );

/**
 * @description               Login a User
 * @param {string} name       Username
 * @param {string} password   Password
 * @return {object}           Cypress $Chainer
 */
Cypress.Commands.add('login', (name, password) => {
  return cy.request({
    method: 'POST',
    url: '/user/login',
    form: true,
    body: {
      name: name,
      pass: password,
      form_id: 'user_login_form'
    }
  });
});

/**
 * @description         Log out the current user
 * @return {object}           Cypress $Chainer
 */
Cypress.Commands.add('logout', () => {
  return cy.request('/user/logout');
});


/**
 * @description             Change Locale
 * @param {string} locale   2-char locale code
 * @return {object}　　　　 Cypress $Chainer
 */
Cypress.Commands.add('setLocale', (locale) => {
  return cy.get(`${block.language_switcher} a[hreflang="${locale}"]`).click();
});
