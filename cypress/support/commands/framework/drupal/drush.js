/**
 * @description                     Command to execute via Drush
 * @param {string|array} commands   Pipe commands to Drush
 * @return {object}                 {stdout, stderr, code}
 */
Cypress.Commands.add('drupalDrushCommand', (commands) => {
    var cmd = Cypress.env('drupalDrushCmdLine');

    if (cmd == null) {
        cmd = 'drush %commands'
    }

    if( typeof commands === 'string' ) {
        commands = [ commands ];
    }

    const execCmd = cmd.replace('%commands', commands.join(' '));

    return cy.exec(execCmd);
});
