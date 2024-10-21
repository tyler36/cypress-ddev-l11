import './routes';
import './app';
import './auth';
import './database';
import './visit';

before(() => {
    cy.task('activateCypressEnvFile', {}, { log: false });
    cy.artisan('config:clear', {}, { log: false });

    cy.refreshRoutes();
});

after(() => {
    cy.task('activateLocalEnvFile', {}, { log: false });
    cy.artisan('config:clear', {}, { log: false });
});
