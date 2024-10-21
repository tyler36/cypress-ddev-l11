import { When } from '@badeball/cypress-cucumber-preprocessor'

When('I scroll {int} px', cy.scrollDistance)
When('{int}ピクセルスクロールします', cy.scrollDistance)
When('I scroll to the {string} of {string}', cy.scrollToSelectorPosition)
When('{string}の{string}までスクロールします', cy.scrollToSelectorPosition)
