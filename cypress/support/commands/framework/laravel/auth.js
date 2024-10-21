/**
 * Create a new user and log them in.
 *
 * @param {Object} attributes
 *
 * @example cy.login();
 * @example cy.login({ name: 'JohnDoe' });
 */
Cypress.Commands.add('login', (attributes = {}) => {
    return cy
        .csrfToken()
        .then((token) => {
            return cy.request({
                method: 'POST',
                url: '/__cypress__/login',
                body: { attributes, _token: token },
                log: false,
            });
        })
        .then(({ body }) => {
            Cypress.log({
                name: 'login',
                message: attributes,
                consoleProps: () => ({ user: body }),
            });
        })
        .its('body', { log: false });
});

/**
 * Logout the current user.
 *
 * @example cy.logout();
 */
Cypress.Commands.add('logout', () => {
    return cy
        .csrfToken()
        .then((token) => {
            return cy.request({
                method: 'POST',
                url: '/__cypress__/logout',
                body: { _token: token },
                log: false,
            });
        })
        .then(() => {
            Cypress.log({ name: 'logout', message: '' });
        });
});
