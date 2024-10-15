import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('I should see a {string} selector', cy.selectorExist)
Then('I should not see {string} selector', cy.selectorNotExist)

Then('I should see {string} in {string}', cy.selectorContainsString)
Then('I should not see {string} in {string}', cy.selectorNotContainsString)

Then('{string} should have {string} value', cy.selectorContainsValue)
Then('{string} should not have {string} value', cy.selectorNotContainsValue)

Then('the {string} selector should be visible', cy.selectorVisible)
Then('{string}セレクターが表示されている必要があります', cy.selectorVisible)
Then('the {string} selector should be hidden', cy.selectorHidden)
Then('{string}セレクターは非表示にする必要があります', cy.selectorHidden)

Then('I should see a link to {string}', cy.linkExist)
Then('{string}へのリンクが表示されます', cy.linkExist)
Then('I should not see a link to {string}', cy.linkNotExist)
Then('{string}へのリンクは表示されません', cy.linkNotExist)

Then('the title should contain {string}', cy.titleContains)
Then('タイトルには{string}を含める必要があります', cy.titleContains)

Then('the description should be {string}', cy.metaDescription)
Then('the {string} metaProp should be {string}', cy.metaProp)
Then('the {string} metaName should be {string}', cy.metaName)

Then('I should see a script with src={string}', cy.scriptExist)

Then('I should not see errors', cy.notSeeErrors)
Then('エラーは表示されません', cy.notSeeErrors)
