import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor'

Given('I visit {string}', cy.visit)
Given('{string}にアクセスします', cy.visit)

Given('disable fixed header', cy.disableHeader)
