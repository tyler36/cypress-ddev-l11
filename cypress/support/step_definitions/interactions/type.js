import { When } from '@badeball/cypress-cucumber-preprocessor'

When('I type {string} into {string}', cy.typeStringInto)
When('{string}に{string}と入力します', (name, query) =>
  cy.typeStringInto(query, name),
)

When('I cktype {string} into {string}', cy.typeStringIntoCkeditor)
When('{string}エディターに{string}と入力します', (name, query) =>
  cy.typeStringIntoCkeditor(query, name),
)
