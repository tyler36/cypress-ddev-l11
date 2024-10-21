/**
 * Seed the database.
 *
 * @param {string} seederClass
 *
 * @example cy.seed();
 * @example cy.seed('PlansTableSeeder');
 */
Cypress.Commands.add('seed', (seederClass) => {
  return cy.artisan('db:seed', {
    '--class': seederClass,
  })
})

/**
 * Refresh the database state.
 *
 * @param {object} options
 *
 * @example cy.refreshDatabase();
 * @example cy.refreshDatabase({ '--drop-views': true });
 */
Cypress.Commands.add('refreshDatabase', (options = {}) => {
  return cy.artisan('migrate:fresh', options)
})

/**
 * Create a new Eloquent factory.
 *
 * @param {string} model
 * @param {number|null} times
 * @param {object} attributes
 *
 * @example cy.createModel('App\\User');
 * @example cy.createModel('App\\User', { active: false });
 * @example cy.createModel('App\\User', { active: false }, {'withPosts'});
 * @example cy.createModel('App\\User', { active: false }, 5);
 */
Cypress.Commands.add(
  'createModel',
  (model = 'App\\Models\\User', attributes = {}, states = null, times = 1) => {
    if (typeof states === 'number') {
      times = states
      states = null
    }

    return cy
      .csrfToken()
      .then((token) => {
        return cy.request({
          method: 'POST',
          url: '/__cypress__/factory',
          body: { attributes, model, states, times, _token: token },
          log: false,
        })
      })
      .then((response) => {
        Cypress.log({
          name: 'create',
          message:
            model +
            (states ? ` (${states})` : '') +
            (times > 1 ? `(${times} times)` : ''),
          consoleProps: () => ({ [model]: response.body }),
        })
      })
      .its('body', { log: false })
  },
)
