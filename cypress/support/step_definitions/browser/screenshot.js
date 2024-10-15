import { Given } from '@badeball/cypress-cucumber-preprocessor'

Given('{string} should match screenshot', cy.matchElement)
Given('{string}はスクリーンショットと一致する必要があります', cy.matchElement)

Given('{string} should match {string} screenshot', cy.matchElementNamed)
Given(
  '{string}は{string}スクリーンショットと一致する必要があります',
  cy.matchElementNamed,
)

Given('page should match screenshot', cy.matchPage)
Given('ページはスクリーンショットと一致する必要があります', cy.matchPage)

Given('page should match {string} screenshot', cy.matchPage)
Given(
  'ページは{string}スクリーンショットと一致する必要があります',
  cy.matchPage,
)
