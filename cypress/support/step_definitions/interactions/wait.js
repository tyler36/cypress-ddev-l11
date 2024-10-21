import { When } from '@badeball/cypress-cucumber-preprocessor'

When('wait {int}', cy.wait)
When('{int}待つ', cy.wait)
